'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const langQuery = searchParams.get('lang')
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState<'id' | 'en'>('id')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (langQuery === 'en' || langQuery === 'id') {
      setLanguage(langQuery)
    }
  }, [langQuery])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLanguageToggle = () => {
    const nextLang = language === 'id' ? 'en' : 'id'
    setLanguage(nextLang)
    
    const params = new URLSearchParams(searchParams.toString())
    params.set('lang', nextLang)
    router.push(`${pathname}?${params.toString()}`)
  }

  const navLinks = [
    { href: `/?lang=${language}#beranda`, label: language === 'id' ? 'Beranda' : 'Home' },
    { href: `/?lang=${language}#layanan`, label: language === 'id' ? 'Layanan' : 'Services' },
    { href: `/tentang?lang=${language}`, label: language === 'id' ? 'Tentang' : 'About' },
    { href: `/kontak?lang=${language}`, label: language === 'id' ? 'Kontak' : 'Contact' },
  ]

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? {
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 4px 24px rgba(30,91,168,0.10)',
              borderBottom: '1px solid rgba(30,91,168,0.08)',
            }
          : {
              background: 'rgba(255,255,255,1)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/logo-ppb.png"
                alt="Logo Politeknik Pariwisata Bali"
                width={40}
                height={41}
                className="rounded-md"
                priority
              />
            </div>
            <div>
              <div className="text-sm font-bold leading-tight" style={{ color: '#1E5BA8' }}>PERPUSTAKAAN</div>
              <div className="text-xs leading-tight" style={{ color: '#6b7280' }}>Politeknik Pariwisata Bali</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-gray-700 font-medium text-sm transition-colors duration-200 hover:text-blue-700 group"
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full"
                  style={{ background: '#1E5BA8' }}
                />
              </Link>
            ))}
          </nav>

          {/* CTA and Language Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleLanguageToggle}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                color: '#1E5BA8',
                border: '1.5px solid #1E5BA8',
                background: 'transparent',
              }}
            >
              {language === 'id' ? 'EN' : 'ID'}
            </button>

            <a
              href="https://library.ppb.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block px-5 py-2.5 bg-primary-600 text-white font-bold rounded-xl text-sm transition-all duration-300 hover:bg-primary-700 hover:scale-105 hover:shadow-md"
            >
              {language === 'id' ? 'Login SLiMS' : 'Login SLiMS'}
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: isOpen ? '400px' : '0', opacity: isOpen ? 1 : 0 }}
        >
          <nav className="pb-4 space-y-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors font-medium text-sm"
                style={{ color: '#374151' }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://library.ppb.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 bg-primary-600 text-white rounded-xl font-bold text-sm mt-2 transition-colors hover:bg-primary-700 text-center"
              onClick={() => setIsOpen(false)}
            >
              Login SLiMS →
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
