import { NextResponse } from 'next/server'
import { setSessionCookie } from '@/lib/session'
import { validateAdminLogin } from '@/lib/auth'

// In-memory rate limiter per IP: max 5 failed attempts in 15 minutes
const loginAttempts = new Map<string, { count: number; resetTime: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const rec = loginAttempts.get(ip)
  if (!rec || now > rec.resetTime) {
    return false
  }
  return rec.count >= 5
}

function recordFailedAttempt(ip: string) {
  const now = Date.now()
  const rec = loginAttempts.get(ip)
  if (!rec || now > rec.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 })
  } else {
    rec.count += 1
  }
}

function resetAttempts(ip: string) {
  loginAttempts.delete(ip)
}

export async function POST(request: Request) {
  try {
    const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1'

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { success: false, error: 'Terlalu banyak percobaan gagal. Silakan coba lagi dalam 15 menit.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username dan password wajib diisi' },
        { status: 400 }
      )
    }

    const isValid = await validateAdminLogin(username.trim(), password)

    if (isValid) {
      resetAttempts(clientIp)
      await setSessionCookie({
        authenticated: true,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      })
      return NextResponse.json({ success: true })
    }

    recordFailedAttempt(clientIp)
    return NextResponse.json(
      { success: false, error: 'Nama pengguna atau kata sandi salah' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan pada server' }, { status: 500 })
  }
}
