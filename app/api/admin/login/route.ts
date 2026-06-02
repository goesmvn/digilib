import { NextResponse } from 'next/server'
import { setSessionCookie } from '@/lib/session'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSCODE || 'admin123'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      )
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      await setSessionCookie({
        authenticated: true,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      })
      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { success: false, error: 'Incorrect username or password' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
