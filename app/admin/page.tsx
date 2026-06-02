import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/session'
import AdminDashboardClient from '@/components/AdminDashboardClient'
import AdminLoginClient from '@/components/AdminLoginClient'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

function AdminLoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm font-semibold text-gray-500">Loading digital library panel...</span>
      </div>
    </div>
  )
}

export default async function AdminPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('admin_session')
  
  console.log('--- ADMIN PAGE REQUEST ---')
  console.log('Session Cookie exists:', !!sessionCookie)
  if (sessionCookie) {
    console.log('Raw Cookie Value:', sessionCookie.value.substring(0, 20) + '...')
  }

  // Verify session on the server side
  const payload = sessionCookie ? verifySessionToken(sessionCookie.value) : null
  console.log('Verified Payload:', payload)
  
  const isAuthenticated = !!payload?.authenticated
  console.log('Is Authenticated:', isAuthenticated)

  return (
    <Suspense fallback={<AdminLoadingFallback />}>
      {isAuthenticated ? (
        <AdminDashboardClient />
      ) : (
        <AdminLoginClient />
      )}
    </Suspense>
  )
}
