import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { validateAdminLogin, updateAdminCredentials, getAdminCredentials } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session?.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const creds = await getAdminCredentials()
  return NextResponse.json({
    username: creds.username,
    hasCustomPassword: !!creds.passwordHash
  })
}

export async function POST(req: Request) {
  const session = await getSession()
  if (!session?.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { currentPassword, newUsername, newPassword } = body

    if (!currentPassword) {
      return NextResponse.json({ error: 'Kata sandi saat ini wajib diisi' }, { status: 400 })
    }

    const creds = await getAdminCredentials()
    const isCurrentValid = await validateAdminLogin(creds.username, currentPassword)
    if (!isCurrentValid) {
      return NextResponse.json({ error: 'Kata sandi saat ini salah' }, { status: 400 })
    }

    if (newPassword && newPassword.length < 8) {
      return NextResponse.json({ error: 'Kata sandi baru minimal 8 karakter' }, { status: 400 })
    }

    await updateAdminCredentials(newUsername || null, newPassword || undefined)

    return NextResponse.json({ 
      success: true, 
      message: 'Kredensial akun admin berhasil diperbarui.' 
    })
  } catch (e) {
    console.error('Error updating admin account:', e)
    return NextResponse.json({ error: 'Gagal memperbarui akun admin' }, { status: 500 })
  }
}
