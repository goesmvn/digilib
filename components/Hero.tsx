'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'

// ─── Slider data ────────────────────────────────────────────────────
const slides = [
  {
    src: '/slide-buku.jpg',
    alt: 'Koleksi Buku Perpustakaan PPB',
    label: 'Koleksi Ribuan Buku',
    caption: 'Temukan buku akademik, jurnal ilmiah, dan referensi pariwisata terlengkap',
  },
  {
    src: '/slide-budaya.jpg',
    alt: 'Budaya Bali – Kecak Dance',
    label: 'Kekayaan Budaya Bali',
    caption: 'Dukung penelitian seni, budaya, dan pariwisata Nusantara',
  },
  {
    src: '/slide-kampus.jpg',
    alt: 'Kampus Politeknik Pariwisata Bali',
    label: 'Kampus PPB Nusa Dua',
    caption: 'Lingkungan belajar modern di jantung destinasi wisata dunia',
  },
]

// ─── Count-up hook ──────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000, delay = 0) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    const startTime = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(eased * target))
      if (p < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [started, target, duration])

  return count
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const count = useCountUp(value, 2000, 800)
  return (
    <div className="text-center min-w-[100px]">
      <div className="text-2xl md:text-3xl font-extrabold" style={{ color: '#D4AF37' }}>
        {count.toLocaleString('id-ID')}
        {suffix}
      </div>
      <p className="text-xs md:text-sm mt-0.5 font-semibold" style={{ color: 'rgba(219,234,254,0.85)' }}>
        {label}
      </p>
    </div>
  )
}

import { translations } from '@/lib/i18n'

// ─── Main Hero ───────────────────────────────────────────────────────
export default function Hero({ lang }: { lang: 'id' | 'en' }) {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [fading, setFading] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const DURATION = 5000 // auto-advance ms

  const h = translations[lang].hero

  const translatedSlides = slides.map((slide, idx) => ({
    ...slide,
    label: h.slides[idx].label,
    caption: h.slides[idx].caption,
  }))

  const goTo = useCallback(
    (index: number) => {
      if (fading || index === current) return
      setFading(true)
      setPrev(current)
      setTimeout(() => {
        setCurrent(index)
        setPrev(null)
        setFading(false)
      }, 700)
    },
    [fading, current]
  )

  const next = useCallback(() => goTo((current + 1) % translatedSlides.length), [current, goTo, translatedSlides.length])

  // Auto-play
  useEffect(() => {
    intervalRef.current = setInterval(next, DURATION)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [next])

  const resetTimer = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    goTo(index)
    intervalRef.current = setInterval(next, DURATION)
  }

  return (
    <section
      id="beranda"
      className="relative text-white overflow-hidden bg-primary-950"
      style={{ minHeight: 'clamp(580px, 90vh, 840px)' }}
    >
      {/* ── Background slides ─────────────────────────────────── */}
      {translatedSlides.map((slide, i) => {
        const isActive = i === current
        const isPrev = i === prev

        return (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: isActive ? 1 : isPrev ? 0 : 0,
              zIndex: isActive ? 2 : isPrev ? 1 : 0,
              pointerEvents: isActive ? 'auto' : 'none',
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover object-center scale-102"
              priority={i === 0}
              sizes="100vw"
            />
            {/* Dark gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(10,25,55,0.7) 0%, rgba(10,25,55,0.85) 50%, rgba(10,25,55,0.95) 100%)',
              }}
            />
          </div>
        )
      })}

      {/* ── Content ───────────────────────────────────────────── */}
      <div
        className="relative flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-24 md:py-36"
        style={{ zIndex: 10, minHeight: 'inherit' }}
      >
        {/* Slide label (changes per slide) */}
        <div
          key={`label-${current}`}
          className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-lg mb-4 animate-fade-in"
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          {translatedSlides[current].label}
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight animate-fade-in-up delay-100 max-w-4xl tracking-tight">
          {h.title}
          <span
            className="block mt-1.5"
            style={{
              background: 'linear-gradient(90deg, #D4AF37, #fde68a, #D4AF37)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% auto',
            }}
          >
            {h.subtitle}
          </span>
        </h1>

        {/* Slide caption */}
        <p
          key={`caption-${current}`}
          className="text-sm md:text-base mb-8 max-w-xl animate-fade-in delay-200 leading-relaxed"
          style={{ color: 'rgba(219,234,254,0.85)' }}
        >
          {translatedSlides[current].caption}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up delay-300">
          <a
            href="https://library.ppb.ac.id"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-7 py-3.5 font-bold rounded-xl inline-flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-sm"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #b8942f)', color: 'white' }}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {h.btnOPAC}
            <svg
              className="w-3.5 h-3.5 ml-0.5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href="https://repo.ppb.ac.id"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-7 py-3.5 bg-white font-bold rounded-xl inline-flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-sm"
            style={{ color: '#1E5BA8' }}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            {h.btnRepo}
            <svg
              className="w-3.5 h-3.5 ml-0.5 transform group-hover:translate-x-1 transition-transform text-primary-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Stats glassmorphism bar */}
        <div
          className="inline-flex flex-wrap justify-center gap-6 md:gap-12 px-8 py-5 rounded-2xl mb-10 border shadow-md"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderColor: 'rgba(255,255,255,0.15)',
          }}
        >
          <StatCounter value={2500} suffix="+" label={lang === 'id' ? 'Koleksi Buku' : 'Books Collection'} />
          <div className="hidden md:block w-px self-stretch" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <StatCounter value={1200} suffix="+" label={lang === 'id' ? 'Anggota Aktif' : 'Active Members'} />
          <div className="hidden md:block w-px self-stretch" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <StatCounter value={45} suffix="+" label={lang === 'id' ? 'Kategori Buku' : 'Book Categories'} />
        </div>

        {/* ── Dot navigation ──────────────────────────────── */}
        <div className="flex items-center gap-3 animate-fade-in-up delay-500">
          {translatedSlides.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => resetTimer(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? 28 : 10,
                height: 10,
                background: i === current ? '#D4AF37' : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 flex flex-col items-center gap-1.5 animate-fade-in delay-700 select-none">
          <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: 'rgba(219,234,254,0.5)' }}>
            {h.scrollDown}
          </span>
          <div className="animate-scroll-bounce">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ color: 'rgba(219,234,254,0.5)' }}>
              <path
                d="M10 4v12M4 11l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Progress bar (bottom) ─────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-1 z-20" style={{ background: 'rgba(255,255,255,0.1)' }}>
        <div
          key={`progress-${current}`}
          className="h-full rounded-r-full"
          style={{
            background: 'linear-gradient(90deg, #D4AF37, #fde68a)',
            animation: `progressBar ${DURATION}ms linear forwards`,
          }}
        />
      </div>

      {/* Inline keyframe for progress bar */}
      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  )
}
