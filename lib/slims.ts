// SLIMS API Client
// Base URL: https://library.ppb.ac.id
import { getCustomEvents } from './db'

const SLIMS_BASE_URL = process.env.NEXT_PUBLIC_SLIMS_URL || 'https://library.ppb.ac.id'

interface SLIMSStats {
  totalTitles: number
  totalMembers: number
  totalCollections: number
  recentLoans: number
}

interface SLIMSEvent {
  id: string
  title: string
  date: string
  time: string
  description: string
  location?: string
  image?: string
}

// Fetch library statistics from SLIMS
export async function getLibraryStats(): Promise<SLIMSStats> {
  try {
    const response = await fetch(`${SLIMS_BASE_URL}/api/v1/statistics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 },
    } as any)

    if (!response.ok) {
      console.warn('Failed to fetch SLIMS statistics from API, using default fallback data.')
      return {
        totalTitles: 2500,
        totalMembers: 1200,
        totalCollections: 45,
        recentLoans: 156,
      }
    }

    const data = await response.json()
    return {
      totalTitles: data.total_titles || 0,
      totalMembers: data.total_members || 0,
      totalCollections: data.total_collections || 0,
      recentLoans: data.recent_loans || 0,
    }
  } catch (error) {
    console.error('Error fetching SLIMS statistics:', error)
    return {
      totalTitles: 2500,
      totalMembers: 1200,
      totalCollections: 45,
      recentLoans: 156,
    }
  }
}

// Fetch upcoming events from SLIMS
export async function getLibraryEvents(limit: number = 3): Promise<SLIMSEvent[]> {
  try {
    const custom = await getCustomEvents()
    const response = await fetch(
      `${SLIMS_BASE_URL}/api/v1/events?limit=${limit}&upcoming=true`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 },
      } as any
    )

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to fetch events from SLIMS API`)
    }

    const data = await response.json()
    const events = data.events || []

    const combined = [...custom, ...events]
    return combined.slice(0, limit)
  } catch (error) {
    console.error('Error fetching SLIMS events:', error)
    const custom = await getCustomEvents()
    const defaultEvents = [
      {
        id: '1',
        title: 'Workshop Literasi Digital',
        date: '2026-06-15',
        time: '10:00',
        description: 'Workshop pelatihan penggunaan database digital perpustakaan',
        location: 'Ruang Baca Utama',
        image: '/service-books.png',
      },
      {
        id: '2',
        title: 'Launching E-Journal Perpustakaan',
        date: '2026-06-20',
        time: '14:00',
        description: 'Peluncuran platform e-journal penelitian terbaru',
        image: '/service-journal.png',
      },
    ]
    const combined = [...custom, ...defaultEvents]
    return combined.slice(0, limit)
  }
}

export async function getLibraryInfo() {
  try {
    const response = await fetch(`${SLIMS_BASE_URL}/api/v1/library-info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    } as any)

    if (!response.ok) {
      console.warn('Failed to fetch library info from API, returning null fallback.')
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching library info:', error)
    return null
  }
}
