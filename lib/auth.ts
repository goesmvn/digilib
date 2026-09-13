import crypto from 'crypto'
import { getSetting, setSetting } from './db'

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, key] = storedHash.split(':')
  if (!salt || !key) return false
  const keyBuffer = Buffer.from(key, 'hex')
  const derivedKey = crypto.scryptSync(password, salt, 64)
  return crypto.timingSafeEqual(keyBuffer, derivedKey)
}

export async function getAdminCredentials(): Promise<{ username: string; passwordHash: string | null; defaultPassword: string }> {
  const dbUsername = await getSetting('admin_username')
  const dbPasswordHash = await getSetting('admin_password_hash')
  
  const envUsername = process.env.ADMIN_USERNAME || 'admin'
  const envPassword = process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSCODE || 'admin123'
  
  return {
    username: dbUsername || envUsername,
    passwordHash: dbPasswordHash,
    defaultPassword: envPassword
  }
}

export async function validateAdminLogin(username: string, password: string): Promise<boolean> {
  const creds = await getAdminCredentials()
  if (username !== creds.username) return false
  
  if (creds.passwordHash) {
    return verifyPassword(password, creds.passwordHash)
  }
  
  return password === creds.defaultPassword
}

export async function updateAdminCredentials(newUsername: string | null, newPassword?: string): Promise<void> {
  if (newUsername && newUsername.trim()) {
    await setSetting('admin_username', newUsername.trim())
  }
  if (newPassword && newPassword.trim()) {
    const hashed = hashPassword(newPassword.trim())
    await setSetting('admin_password_hash', hashed)
  }
}
