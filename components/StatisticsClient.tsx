'use client'

import { useEffect, useRef, useState } from 'react'

function useCountUp(target: number, duration: number = 2000, trigger: boolean = false) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!trigger || !target) return
    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [trigger, target, duration])

  return count
}

interface StatisticsClientProps {
  stats: {
    totalTitles: number
    totalMembers: number
    totalCollections: number
    recentLoans: number
  }
  lang: 'id' | 'en'
}

export function StatisticsClient({ stats: initialStats, lang }: StatisticsClientProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [trigger, setTrigger] = useState(false)
  const [scopusStats, setScopusStats] = useState({
    hospitality: 485200,
    kepariwisataan: 1245800,
    totalArticles: 1731000,
  })

  const isEn = lang === 'en'

  useEffect(() => {
    async function loadScopusStats() {
      try {
        const res = await fetch('/api/scopus/stats')
        if (res.ok) {
          const data = await res.json()
          setScopusStats(data)
        }
      } catch (e) {
        console.error('Error loading Scopus stats:', e)
      }
    }
    loadScopusStats()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTrigger(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const hospitalityCount = useCountUp(scopusStats.hospitality, 2000, trigger)
  const kepariwisataanCount = useCountUp(scopusStats.kepariwisataan, 2000, trigger)
  const totalCount = useCountUp(scopusStats.totalArticles, 2000, trigger)

  return (
    <section
      ref={sectionRef}
      className="py-12 relative bg-gray-50/70 border-t border-b border-gray-200/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-200/90 rounded-3xl p-8 md:p-10 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200/90">
            
            {/* Item 1: Jurusan Hospitaliti */}
            <div className="flex flex-col items-center justify-center text-center pb-6 md:pb-0 md:px-6">
              <span className="text-4xl md:text-5xl font-extrabold text-accent-600 tracking-tight mb-2">
                {hospitalityCount.toLocaleString('id-ID')}+
              </span>
              <span className="text-primary-900 font-extrabold text-sm md:text-base">
                {isEn ? 'Hospitality Department Articles' : 'Judul Artikel Jurusan Hospitaliti'}
              </span>
              <span className="text-[11px] text-gray-500 mt-1 max-w-[240px] leading-tight font-medium">
                {isEn ? 'PPH, MAH, DIK, SKU, TAH' : 'PPH, MAH, DIK, SKU, TAH'}
              </span>
            </div>

            {/* Item 2: Jurusan Kepariwisataan */}
            <div className="flex flex-col items-center justify-center text-center py-6 md:py-0 md:px-6">
              <span className="text-4xl md:text-5xl font-extrabold text-accent-600 tracking-tight mb-2">
                {kepariwisataanCount.toLocaleString('id-ID')}+
              </span>
              <span className="text-primary-900 font-extrabold text-sm md:text-base">
                {isEn ? 'Tourism Department Articles' : 'Judul Artikel Jurusan Kepariwisataan'}
              </span>
              <span className="text-[11px] text-gray-500 mt-1 max-w-[240px] leading-tight font-medium">
                {isEn ? 'DEP, UPW, PKA' : 'DEP, UPW, PKA'}
              </span>
            </div>

            {/* Item 3: Total Koleksi Scopus */}
            <div className="flex flex-col items-center justify-center text-center pt-6 md:pt-0 md:px-6">
              <span className="text-4xl md:text-5xl font-extrabold text-accent-600 tracking-tight mb-2">
                {totalCount.toLocaleString('id-ID')}+
              </span>
              <span className="text-primary-900 font-extrabold text-sm md:text-base">
                {isEn ? 'Total Indexed Scopus Articles' : 'Total Judul Artikel Terindeks Scopus'}
              </span>
              <span className="text-[11px] text-accent-600 font-bold mt-1 leading-tight">
                {isEn ? 'Source From Elsevier Scopus' : 'Source From Elsevier Scopus'}
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
