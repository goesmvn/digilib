import crypto from 'crypto'
import { cookies } from 'next/headers'

// Stable session secret fallback to avoid mismatches during Next.js dev server reloads
const SESSION_SECRET = process.env.SESSION_SECRET || 'ppb_library_secure_session_secret_token_2026'
const COOKIE_NAME = 'admin_session'

export interface SessionPayload {
  authenticated: boolean
  expiresAt: number
}

// Signs a payload using HMAC-SHA256
export function signSession(payload: SessionPayload): string {
  const payloadStr = JSON.stringify(payload)
  const encodedPayload = Buffer.from(payloadStr).toString('base64url')
  
  const hmac = crypto.createHmac('sha256', SESSION_SECRET)
  hmac.update(encodedPayload)
  const signature = hmac.digest('base64url')
  
  return `${encodedPayload}.${signature}`
}

// Verifies and decodes a session token
export function verifySessionToken(token: string): SessionPayload | null {
  if (!token) {
    console.warn('verifySessionToken: token is empty')
    return null
  }
  
  const parts = token.split('.')
  if (parts.length !== 2) {
    console.warn('verifySessionToken: invalid token structure (parts != 2)')
    return null
  }
  
  const [encodedPayload, signature] = parts
  
  // Verify signature
  const hmac = crypto.createHmac('sha256', SESSION_SECRET)
  hmac.update(encodedPayload)
  const expectedSignature = hmac.digest('base64url')
  
  if (signature !== expectedSignature) {
    console.warn('verifySessionToken: signature mismatch! expected:', expectedSignature, 'got:', signature)
    return null // Signature mismatch
  }
  
  try {
    const payloadStr = Buffer.from(encodedPayload, 'base64url').toString('utf8')
    const payload = JSON.parse(payloadStr) as SessionPayload
    
    // Check expiration
    if (Date.now() > payload.expiresAt) {
      console.warn('verifySessionToken: token expired! now:', Date.now(), 'expires:', payload.expiresAt)
      return null // Expired
    }
    
    return payload
  } catch (e) {
    console.error('verifySessionToken: error parsing payload:', e)
    return null
  }
}

// Helper to check the current request cookie
export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies()
    const cookie = cookieStore.get(COOKIE_NAME)
    if (!cookie) return null
    return verifySessionToken(cookie.value)
  } catch (e) {
    return null
  }
}

// Helper to set session cookie
export async function setSessionCookie(payload: SessionPayload) {
  const token = signSession(payload)
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 24 * 60 * 60, // 1 day
  })
}

// Helper to clear session cookie
export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0, // Instant expiry
  })
}
