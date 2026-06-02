'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const loginTranslations = {
  id: {
    loginTitle: 'Akses Admin Perpustakaan',
    loginSubtitle: 'Masukkan nama pengguna dan kata sandi untuk mengelola berita dan agenda kegiatan.',
    usernamePlaceholder: 'Masukkan Nama Pengguna',
    passwordPlaceholder: 'Masukkan Kata Sandi',
    loginBtn: 'Masuk Ke Panel',
    loginError: 'Nama pengguna atau sandi salah.',
  },
  en: {
    loginTitle: 'Library Admin Access',
    loginSubtitle: 'Enter your username and password to manage news and library agendas.',
    usernamePlaceholder: 'Enter Username',
    passwordPlaceholder: 'Enter Password',
    loginBtn: 'Log In to Panel',
    loginError: 'Incorrect username or password.',
  }
}

export default function AdminLoginClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const langQuery = searchParams.get('lang')
  const lang = (langQuery === 'en' ? 'en' : 'id') as 'id' | 'en'
  const t = loginTranslations[lang]

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        // Refresh and reload to ensure the new cookie is fully propagated and rendered
        router.refresh()
        window.location.reload()
      } else {
        const data = await res.json()
        setLoginError(data.error || t.loginError)
      }
    } catch (err) {
      setLoginError(t.loginError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-primary-950 to-primary-900 flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-500/15 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent-500/20 text-accent-400 border border-accent-500/35 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">{t.loginTitle}</h2>
          <p className="text-gray-300 text-sm mt-2 leading-relaxed">{t.loginSubtitle}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t.usernamePlaceholder}
                className="w-full px-5 py-3.5 bg-white/5 border border-white/15 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 rounded-xl text-white placeholder-gray-400 outline-none text-sm transition-all shadow-inner"
                disabled={loading}
                required
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
                className="w-full px-5 py-3.5 bg-white/5 border border-white/15 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 rounded-xl text-white placeholder-gray-400 outline-none text-sm transition-all shadow-inner"
                disabled={loading}
                required
              />
            </div>
          </div>

          {loginError && (
            <div className="p-3.5 bg-red-500/15 border border-red-500/30 text-red-300 rounded-xl text-xs font-semibold flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{loginError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-accent-500 hover:bg-accent-600 active:scale-[0.98] text-primary-950 font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-primary-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              t.loginBtn
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
