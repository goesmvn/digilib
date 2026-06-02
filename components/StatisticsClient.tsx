'use client'

import { useEffect, useRef, useState } from 'react'

interface StatItem {
  iconType: 'books' | 'users' | 'folders' | 'loans'
  label: string
  value: number
  suffix: string
  color: string
  iconBg: string
  glow: string
}

function useCountUp(target: number, duration: number = 2000, trigger: boolean = false) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!trigger) return
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

function renderIcon(type: string) {
  switch (type) {
    case 'books':
      return (
        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      )
    case 'users':
      return (
        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )
    case 'folders':
      return (
        <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      )
    case 'loans':
      return (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      )
    default:
      return null
  }
}

function StatCard({ item, index, trigger }: { item: StatItem; index: number; trigger: boolean }) {
  const count = useCountUp(item.value, 2000, trigger)

  return (
    <div
      className="group relative p-6 rounded-2xl border transition-all duration-500 hover:scale-105 cursor-default animate-fade-in-up"
      style={{
        background: 'white',
        borderColor: 'rgba(30,91,168,0.1)',
        boxShadow: '0 4px 16px rgba(30,91,168,0.06)',
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: item.glow,
          filter: 'blur(20px)',
          transform: 'scale(0.9)',
          zIndex: -1,
        }}
      />

      {/* Custom SVG Icon Container */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
        style={{ background: item.iconBg }}
      >
        {renderIcon(item.iconType)}
      </div>

      {/* Label */}
      <p className="text-gray-500 text-sm mb-1 font-semibold">{item.label}</p>

      {/* Value with count-up */}
      <div className="flex items-baseline gap-1">
        <span className="text-3xl md:text-4xl font-extrabold" style={{ color: '#1E5BA8' }}>
          {count.toLocaleString('id-ID')}
        </span>
        <span className="text-xl font-black" style={{ color: '#D4AF37' }}>
          {item.suffix}
        </span>
      </div>

      {/* Bottom accent bar */}
      <div
        className="mt-4 h-1 rounded-full transition-all duration-500 w-0 group-hover:w-full"
        style={{ background: `linear-gradient(90deg, #1E5BA8, #D4AF37)` }}
      />
    </div>
  )
}

import { translations } from '@/lib/i18n'

interface StatisticsClientProps {
  stats: {
    totalTitles: number
    totalMembers: number
    totalCollections: number
    recentLoans: number
  }
  lang: 'id' | 'en'
}

export function StatisticsClient({ stats, lang }: StatisticsClientProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [trigger, setTrigger] = useState(false)

  const s = translations[lang].statistics

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

  const statItems: StatItem[] = [
    {
      iconType: 'books',
      label: s.cards.books,
      value: stats.totalTitles,
      suffix: '+',
      color: 'bg-blue-50',
      iconBg: 'rgba(30,91,168,0.08)',
      glow: 'radial-gradient(circle, rgba(30,91,168,0.12) 0%, transparent 70%)',
    },
    {
      iconType: 'users',
      label: s.cards.members,
      value: stats.totalMembers,
      suffix: '+',
      color: 'bg-teal-50',
      iconBg: 'rgba(20,184,166,0.1)',
      glow: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)',
    },
    {
      iconType: 'folders',
      label: s.cards.categories,
      value: stats.totalCollections,
      suffix: '+',
      color: 'bg-orange-50',
      iconBg: 'rgba(212,175,55,0.1)',
      glow: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
    },
    {
      iconType: 'loans',
      label: s.cards.loans,
      value: stats.recentLoans,
      suffix: '+',
      color: 'bg-purple-50',
      iconBg: 'rgba(139,92,246,0.1)',
      glow: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 border-t border-gray-150"
      style={{ background: '#f8faff' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold mb-4 animate-fade-in-up border border-primary-100/50"
            style={{ background: 'rgba(30,91,168,0.06)', color: '#1E5BA8' }}
          >
            <svg
              className="w-3.5 h-3.5 text-primary-600 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"
              />
            </svg>
            {s.badge}
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4 animate-fade-in-up delay-100 tracking-tight"
            style={{ color: '#1E5BA8' }}
          >
            {s.title}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base animate-fade-in-up delay-200">
            {s.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((item, index) => (
            <StatCard key={index} item={item} index={index} trigger={trigger} />
          ))}
        </div>
      </div>
    </section>
  )
}
