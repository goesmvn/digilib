'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { translations } from '@/lib/i18n'

export default function Footer() {
  const searchParams = useSearchParams()
  const langQuery = searchParams.get('lang')
  const lang = (langQuery === 'en' ? 'en' : 'id') as 'id' | 'en'

  const currentYear = new Date().getFullYear()
  const f = translations[lang].footer

  return (
    <footer className="bg-primary-950 text-white border-t border-primary-900">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Image
                  src="/logo-ppb.png"
                  alt="Logo Politeknik Pariwisata Bali"
                  width={48}
                  height={50}
                  className="rounded-md"
                />
              </div>
              <div>
                <div className="font-extrabold text-base leading-tight tracking-wide">
                  Perpustakaan PPB
                </div>
                <div className="text-xs text-accent-400 font-semibold leading-tight mt-0.5">
                  Politeknik Pariwisata Bali
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {f.desc}
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/poltekparbali"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-900 hover:bg-accent-500 hover:text-primary-950 border border-primary-800 rounded-full flex items-center justify-center transition-all duration-200"
                title="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/poltekparbali"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-900 hover:bg-accent-500 hover:text-primary-950 border border-primary-800 rounded-full flex items-center justify-center transition-all duration-200"
                title="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@politeknikpariwisatabali"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-900 hover:bg-accent-500 hover:text-primary-950 border border-primary-800 rounded-full flex items-center justify-center transition-all duration-200"
                title="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="text-base font-bold tracking-wider uppercase mb-6 text-accent-400">
              {f.layananHeader}
            </h4>
            <ul className="space-y-3">
              {f.layananLinks.map((link, idx) => (
                <li key={idx}>
                  {link.href.startsWith('http') ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-accent-400 transition-colors text-sm font-medium"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={`${link.href}?lang=${lang}`}
                      className="text-gray-300 hover:text-accent-400 transition-colors text-sm font-medium"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Tentang */}
          <div>
            <h4 className="text-base font-bold tracking-wider uppercase mb-6 text-accent-400">
              {f.perpustakaanHeader}
            </h4>
            <ul className="space-y-3">
              {f.perpustakaanLinks.map((link, idx) => (
                <li key={idx}>
                  {link.href.startsWith('http') ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-accent-400 transition-colors text-sm font-medium"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={`${link.href}?lang=${lang}`}
                      className="text-gray-300 hover:text-accent-400 transition-colors text-sm font-medium"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-base font-bold tracking-wider uppercase mb-6 text-accent-400">
              {f.hubungiHeader}
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="mailto:perpustakaan@ppb.ac.id"
                  className="text-gray-300 hover:text-accent-400 transition-colors text-sm flex items-center gap-2.5 font-medium"
                >
                  <svg
                    className="w-4 h-4 text-accent-400 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  perpustakaan@ppb.ac.id
                </a>
              </li>
              <li>
                <a
                  href="tel:+62361773537"
                  className="text-gray-300 hover:text-accent-400 transition-colors text-sm flex items-center gap-2.5 font-medium"
                >
                  <svg
                    className="w-4 h-4 text-accent-400 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +62 361 773537
                </a>
              </li>
              <li className="text-gray-300 text-sm flex items-center gap-2.5 font-medium">
                <svg
                  className="w-4 h-4 text-accent-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {f.address}
              </li>
              <li className="text-gray-300 text-sm flex items-center gap-2.5 font-medium">
                <svg
                  className="w-4 h-4 text-accent-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {f.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-900/60 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left font-medium">
            &copy; {currentYear} {f.copyRight}
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="https://ppb.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent-400 text-sm transition-colors font-medium"
            >
              {f.websiteResmi}
            </a>
            <Link
              href={`#?lang=${lang}`}
              className="text-gray-400 hover:text-accent-400 text-sm transition-colors font-medium"
            >
              {f.syaratKetentuan}
            </Link>
          </div>
        </div>
      </div>

      {/* Minimal Bottom Bar */}
      <div className="bg-primary-950/60 border-t border-primary-900/40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-xs font-semibold tracking-wide">
          {f.bottomBar}
        </div>
      </div>
    </footer>
  )
}
