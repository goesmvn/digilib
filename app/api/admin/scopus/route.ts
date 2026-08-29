import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/session'
import { getScopusConfig, saveScopusConfig } from '@/lib/scopus'

async function checkAdminSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('admin_session')
  if (!sessionCookie) return false
  const payload = verifySessionToken(sessionCookie.value)
  return !!payload?.authenticated
}

export async function GET() {
  const isAdmin = await checkAdminSession()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const config = await getScopusConfig()
  
  // Mask API key for security preview
  const maskedKey = config.apiKey ? `${config.apiKey.substring(0, 4)}...${config.apiKey.substring(config.apiKey.length - 4)}` : ''
  const maskedToken = config.instToken ? `${config.instToken.substring(0, 4)}...${config.instToken.substring(config.instToken.length - 4)}` : ''

  return NextResponse.json({
    hasApiKey: !!config.apiKey,
    hasInstToken: !!config.instToken,
    maskedKey,
    maskedToken,
    searchLimitPerMin: config.searchLimitPerMin,
    requireLoginForSearch: config.requireLoginForSearch,
    requireLoginForDownload: config.requireLoginForDownload
  })
}

export async function POST(req: Request) {
  const isAdmin = await checkAdminSession()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const updates: Parameters<typeof saveScopusConfig>[0] = {}

    if (typeof body.apiKey === 'string') updates.apiKey = body.apiKey.trim()
    if (typeof body.instToken === 'string') updates.instToken = body.instToken.trim()
    if (typeof body.searchLimitPerMin === 'number') updates.searchLimitPerMin = body.searchLimitPerMin
    if (typeof body.requireLoginForSearch === 'boolean') updates.requireLoginForSearch = body.requireLoginForSearch
    if (typeof body.requireLoginForDownload === 'boolean') updates.requireLoginForDownload = body.requireLoginForDownload

    await saveScopusConfig(updates)
    return NextResponse.json({ success: true, message: 'Scopus configuration saved safely.' })
  } catch (e) {
    console.error('Error saving Scopus admin config:', e)
    return NextResponse.json({ error: 'Failed to save configuration' }, { status: 500 })
  }
}
