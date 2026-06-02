import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Perpustakaan Politeknik Pariwisata Bali',
  description:
    'Platform digital perpustakaan terintegrasi dengan sistem SLIMS - akses koleksi buku, repository penelitian, dan e-resources untuk mendukung pembelajaran akademik di Politeknik Pariwisata Bali.',
  keywords: [
    'perpustakaan',
    'SLIMS',
    'buku digital',
    'repository penelitian',
    'PPB',
    'Politeknik Pariwisata Bali',
  ],
  icons: {
    icon: [
      { url: '/logo-ppb.png', type: 'image/png' },
    ],
    apple: '/logo-ppb.png',
    shortcut: '/logo-ppb.png',
  },
  openGraph: {
    title: 'Perpustakaan Politeknik Pariwisata Bali',
    description:
      'Platform digital perpustakaan terintegrasi dengan sistem SLIMS',
    type: 'website',
    url: 'https://perpustakaan.ppb.ac.id',
    images: [{ url: '/logo-ppb.png', width: 350, height: 362 }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <Suspense fallback={<div className="h-16 bg-white border-b border-gray-200/80" />}>
          <Header />
        </Suspense>
        <main className="flex-grow">{children}</main>
        <Suspense fallback={<div className="h-64 bg-primary-950" />}>
          <Footer />
        </Suspense>
      </body>
    </html>
  )
}
