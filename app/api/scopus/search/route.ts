import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/session'
import { getScopusConfig } from '@/lib/scopus'

// In-memory rate limiting map: IP -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string, limitPerMin: number): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= limitPerMin) {
    return false
  }

  record.count += 1
  return true
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q') || ''
  const start = searchParams.get('start') || '0'
  const count = searchParams.get('count') || '10'
  const year = searchParams.get('year') || ''

  if (!query.trim()) {
    return NextResponse.json({ error: 'Query parameter q is required' }, { status: 400 })
  }

  const config = await getScopusConfig()

  if (!config.apiKey) {
    return NextResponse.json({ 
      error: 'Scopus API Key is not configured by Admin.', 
      code: 'API_KEY_MISSING' 
    }, { status: 503 })
  }

  // Security Check 1: Authentication requirement for Search
  if (config.requireLoginForSearch) {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')
    const isValidSession = sessionCookie ? verifySessionToken(sessionCookie.value) : null
    if (!isValidSession?.authenticated) {
      return NextResponse.json({ error: 'Search requires authentication. Please log in.' }, { status: 401 })
    }
  }

  // Security Check 2: Rate Limiting by IP
  const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  const isAllowed = checkRateLimit(clientIp, config.searchLimitPerMin)
  if (!isAllowed) {
    return NextResponse.json({ 
      error: `Rate limit exceeded. Maximum ${config.searchLimitPerMin} searches per minute allowed.` 
    }, { status: 429 })
  }

  // Call Elsevier Scopus Search API
  try {
    const scopusUrl = new URL('https://api.elsevier.com/content/search/scopus')
    let finalQuery = query
    if (year.trim()) {
      finalQuery = `(${query}) AND PUBYEAR IS ${year}`
    } else {
      finalQuery = query
    }
    scopusUrl.searchParams.set('query', finalQuery)
    scopusUrl.searchParams.set('start', start)
    scopusUrl.searchParams.set('count', count)

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'X-ELS-APIKey': config.apiKey
    }

    if (config.instToken) {
      headers['X-ELS-Insttoken'] = config.instToken
    }

    const res = await fetch(scopusUrl.toString(), { headers, next: { revalidate: 300 } })
    
    if (!res.ok) {
      const errText = await res.text()
      console.error('Elsevier Scopus API Error:', res.status, errText)
      return NextResponse.json({ error: 'Failed to fetch from Elsevier Scopus API', status: res.status }, { status: res.status })
    }

    const data = await res.json()
    const searchResults = data['search-results'] || {}
    const entryList = searchResults.entry || []

    // Map clean results
    const results = entryList.map((item: any) => {
      const doi = item['prism:doi'] || ''
      const scopusId = item['dc:identifier']?.replace('SCOPUS_ID:', '') || ''
      const links = item['link'] || []
      const scopusLink = links.find((l: any) => l['@ref'] === 'scopus')?.['@href'] || ''
      const fullTextLink = links.find((l: any) => l['@ref'] === 'full-text')?.['@href'] || ''
      const publisher = item['dc:publisher'] || ''
      const isOpenAccess = item['openaccess'] === '1' || item['openaccessFlag'] === true
      const isScienceDirect = fullTextLink.includes('sciencedirect.com') || publisher.toLowerCase().includes('elsevier')

      return {
        id: scopusId || doi,
        title: item['dc:title'] || 'Untitled',
        creator: item['dc:creator'] || 'Unknown Author',
        publicationName: item['prism:publicationName'] || '',
        publisher,
        coverDate: item['prism:coverDate'] || '',
        doi,
        citedByCount: item['citedby-count'] || '0',
        scopusUrl: scopusLink,
        downloadUrl: doi ? `/api/scopus/download?doi=${encodeURIComponent(doi)}` : null,
        isOpenAccess,
        isScienceDirect
      }
    })

    return NextResponse.json({
      totalResults: parseInt(searchResults['opensearch:totalResults'] || '0', 10),
      startIndex: parseInt(searchResults['opensearch:startIndex'] || '0', 10),
      itemsPerPage: parseInt(searchResults['opensearch:itemsPerPage'] || '0', 10),
      results
    })

  } catch (e) {
    console.error('Scopus Search Proxy Server Error:', e)
    return NextResponse.json({ error: 'Internal server error while reaching Scopus' }, { status: 500 })
  }
}
