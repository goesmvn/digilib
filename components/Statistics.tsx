import { getLibraryStats } from '@/lib/slims'
import { StatisticsClient } from './StatisticsClient'

export default async function Statistics({ lang }: { lang: 'id' | 'en' }) {
  const stats = await getLibraryStats()
  return <StatisticsClient stats={stats} lang={lang} />
}
