import { Suspense } from 'react'
import Hero from '@/components/Hero'
import Statistics from '@/components/Statistics'
import LatestNews from '@/components/LatestNews'
import UpcomingEvents from '@/components/UpcomingEvents'
import QuickLinks from '@/components/QuickLinks'

interface PageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedParams = await searchParams
  const lang = (resolvedParams.lang === 'en' ? 'en' : 'id') as 'id' | 'en'

  return (
    <>
      <Hero lang={lang} />

      <Suspense fallback={<StatisticsSkeleton />}>
        <Statistics lang={lang} />
      </Suspense>

      <Suspense fallback={<NewsSkeleton />}>
        <LatestNews lang={lang} />
      </Suspense>

      <Suspense fallback={<EventsSkeleton />}>
        <UpcomingEvents lang={lang} />
      </Suspense>

      <QuickLinks lang={lang} />
    </>
  )
}

// Skeleton loaders for better UX
function StatisticsSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    </section>
  )
}

function NewsSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 bg-gray-200 rounded w-1/3 mb-12 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EventsSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 bg-gray-200 rounded w-1/3 mb-12 animate-pulse"></div>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    </section>
  )
}
