import { getSetting, setSetting } from '@/lib/db'
import crypto from 'crypto'

const ENCRYPTION_KEY = process.env.SESSION_SECRET || 'ppb_library_secure_session_secret_token_2026'

function getDerivedKey(): Buffer {
  return crypto.createHash('sha256').update(ENCRYPTION_KEY).digest()
}

export function encryptString(text: string): string {
  if (!text) return ''
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-gcm', getDerivedKey(), iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const authTag = cipher.getAuthTag().toString('hex')
  return `${iv.toString('hex')}:${authTag}:${encrypted}`
}

export function decryptString(encryptedData: string): string {
  if (!encryptedData) return ''
  const parts = encryptedData.split(':')
  if (parts.length !== 3) return ''
  const [ivHex, authTagHex, encryptedText] = parts
  const iv = Buffer.from(ivHex, 'hex')
  const authTag = Buffer.from(authTagHex, 'hex')
  const decipher = crypto.createDecipheriv('aes-256-gcm', getDerivedKey(), iv)
  decipher.setAuthTag(authTag)
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

export interface ScopusConfig {
  apiKey: string
  instToken: string
  searchLimitPerMin: number
  requireLoginForSearch: boolean
  requireLoginForDownload: boolean
}

export async function getScopusConfig(): Promise<ScopusConfig> {
  const encKey = await getSetting('scopus_api_key')
  const encToken = await getSetting('scopus_inst_token')
  const searchLimit = await getSetting('scopus_search_limit')
  const reqSearchLogin = await getSetting('scopus_req_search_login')
  const reqDownloadLogin = await getSetting('scopus_req_download_login')

  let apiKey = ''
  let instToken = ''

  try {
    if (encKey) apiKey = decryptString(encKey)
  } catch (e) {
    console.error('Failed to decrypt Scopus API key:', e)
  }

  try {
    if (encToken) instToken = decryptString(encToken)
  } catch (e) {
    console.error('Failed to decrypt Scopus Inst token:', e)
  }

  return {
    apiKey: apiKey || process.env.SCOPUS_API_KEY || '',
    instToken: instToken || process.env.SCOPUS_INST_TOKEN || '',
    searchLimitPerMin: searchLimit ? parseInt(searchLimit, 10) : 10,
    requireLoginForSearch: reqSearchLogin === 'true',
    requireLoginForDownload: reqDownloadLogin !== 'false', // Default true
  }
}

export async function saveScopusConfig(config: Partial<ScopusConfig>): Promise<void> {
  if (config.apiKey !== undefined) {
    const enc = encryptString(config.apiKey)
    await setSetting('scopus_api_key', enc)
  }
  if (config.instToken !== undefined) {
    const enc = encryptString(config.instToken)
    await setSetting('scopus_inst_token', enc)
  }
  if (config.searchLimitPerMin !== undefined) {
    await setSetting('scopus_search_limit', config.searchLimitPerMin.toString())
  }
  if (config.requireLoginForSearch !== undefined) {
    await setSetting('scopus_req_search_login', config.requireLoginForSearch ? 'true' : 'false')
  }
  if (config.requireLoginForDownload !== undefined) {
    await setSetting('scopus_req_download_login', config.requireLoginForDownload ? 'true' : 'false')
  }
}
