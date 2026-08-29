import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/session'
import { getScopusConfig } from '@/lib/scopus'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const doi = searchParams.get('doi')
  const redirectOnly = searchParams.get('redirect') === 'true'

  if (!doi) {
    return NextResponse.json({ error: 'DOI parameter is required' }, { status: 400 })
  }

  const config = await getScopusConfig()

  // Security Check: Download Authentication Guard
  if (config.requireLoginForDownload) {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')
    const isValidSession = sessionCookie ? verifySessionToken(sessionCookie.value) : null

    if (!isValidSession?.authenticated) {
      return NextResponse.json({ 
        error: 'Access restricted. You must log in to download or view full text.', 
        code: 'AUTH_REQUIRED' 
      }, { status: 403 })
    }
  }

  // Fallback default: Redirect to official DOI resolver page
  const doiUrl = `https://doi.org/${encodeURIComponent(doi)}`

  // If redirect requested or API key missing, forward directly to DOI
  if (redirectOnly || !config.apiKey) {
    return NextResponse.redirect(doiUrl)
  }

  // Attempt Elsevier Article Retrieval API (Full Text / PDF if campus API key supports)
  try {
    const articleUrl = `https://api.elsevier.com/content/article/doi/${encodeURIComponent(doi)}`
    const headers: Record<string, string> = {
      'Accept': 'application/pdf',
      'X-ELS-APIKey': config.apiKey
    }
    if (config.instToken) {
      headers['X-ELS-Insttoken'] = config.instToken
    }

    const res = await fetch(articleUrl, { headers })

    if (res.ok && res.headers.get('content-type')?.includes('application/pdf')) {
      const arrayBuffer = await res.arrayBuffer()
      return new NextResponse(arrayBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename="${doi.replace('/', '_')}.pdf"`
        }
      })
    }

    // If PDF retrieval not allowed by Elsevier key permissions, fallback redirect to DOI page
    return NextResponse.redirect(doiUrl)

  } catch (e) {
    console.error('Error proxying article retrieval, redirecting to DOI:', e)
    return NextResponse.redirect(doiUrl)
  }
}
