// PPB Website API Client
// Fetches news and announcements from ppb.ac.id/en/?s=rss

const PPB_RSS_SEARCH_URL = 'https://ppb.ac.id/en/?s=rss'

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  image?: string
  date: string
  link: string
  category?: string
}

function parseCategory(blockContent: string): string {
  // Extract category from WordPress classes e.g., category-brida-badung-en
  const match = blockContent.match(/class="[^"]*category-([a-zA-Z0-9-]+)/i)
  if (match) {
    const rawCat = match[1]
      .split('-')
      .filter((w) => w.toLowerCase() !== 'en')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
    return rawCat || 'Berita'
  }
  return 'Berita'
}

function parseDateString(dateStr: string): string {
  if (!dateStr) return new Date().toISOString().slice(0, 10)

  const months: Record<string, string> = {
    jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
    jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
    january: '01', february: '02', march: '03', april: '04',
    june: '06', july: '07', august: '08', september: '09',
    october: '10', november: '11', december: '12',
  }

  const cleanStr = dateStr.trim().replace(/,/g, '')
  const parts = cleanStr.split(/\s+/)
  if (parts.length === 3) {
    // DD Month YYYY
    if (/^\d+$/.test(parts[0])) {
      const day = parts[0].padStart(2, '0')
      const monthName = parts[1].toLowerCase()
      const month = months[monthName] || '01'
      const year = parts[2]
      return `${year}-${month}-${day}`
    }
    // Month DD YYYY
    if (/^\d+$/.test(parts[1])) {
      const monthName = parts[0].toLowerCase()
      const month = months[monthName] || '01'
      const day = parts[1].padStart(2, '0')
      const year = parts[2]
      return `${year}-${month}-${day}`
    }
  }
  return new Date().toISOString().slice(0, 10)
}

/**
 * Fetch news from the PPB search results RSS/HTML page
 */
async function fetchNewsFromRSS(limit: number): Promise<NewsItem[]> {
  const response = await fetch(PPB_RSS_SEARCH_URL, {
    method: 'GET',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9',
    },
    next: { revalidate: 600 }, // Cache for 10 minutes
  } as RequestInit & { next?: { revalidate?: number } })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const html = await response.text()
  const items: NewsItem[] = []

  // Match all <article id="post-X"> ... </article> blocks
  const articleRegex = /<article id="post-(\d+)"[^>]*>([\s\S]*?)<\/article>/gi
  let match: RegExpExecArray | null
  let idx = 0

  while ((match = articleRegex.exec(html)) !== null && idx < limit) {
    const postId = match[1]
    const content = match[2]

    // Extract title & link
    const titleMatch = content.match(
      /<h2 class="entry-title"><a href="([^"]+)">([\s\S]*?)<\/a><\/h2>/i
    )
    if (!titleMatch) continue

    const link = titleMatch[1]
    const title = titleMatch[2].trim().replace(/&amp;/g, '&')

    // Avoid generic announcements / non-article elements if possible
    if (link.includes('/pengumuman/')) continue

    // Extract image
    const imgMatch = content.match(/<img[^>]+src="([^"]+)"/i)
    const image = imgMatch ? imgMatch[1] : undefined

    // Extract date
    const dateMatch = content.match(/<span class="published">([^<]+)<\/span>/i)
    const rawDate = dateMatch ? dateMatch[1] : ''
    const date = parseDateString(rawDate)

    // Extract excerpt
    const excerptMatch = content.match(/<div class="post-content">([\s\S]*?)<\/div>/i)
    let excerpt = ''
    if (excerptMatch) {
      excerpt = excerptMatch[1]
        .replace(/<[^>]+>/g, '') // remove HTML tags
        .replace(/&amp;/g, '&')
        .replace(/&[a-z]+;/gi, ' ') // remove HTML entities
        .trim()
        .substring(0, 150)
    }

    items.push({
      id: `ppb-${postId}-${idx}`,
      title,
      excerpt: excerpt || title,
      image,
      date,
      link,
      category: parseCategory(content),
    })
    idx++
  }

  return items
}

import { getCustomNews } from './db'

/**
 * Fetch latest news from ppb.ac.id
 */
export async function getLatestNews(limit: number = 3): Promise<NewsItem[]> {
  try {
    const custom = await getCustomNews()
    const items = await fetchNewsFromRSS(limit)
    const combined = [...custom, ...items]
    return combined.slice(0, limit)
  } catch (error) {
    console.error('Error fetching PPB news:', error)
    const custom = await getCustomNews()
    const combined = [...custom, ...getDefaultNews()]
    return combined.slice(0, limit)
  }
}

// Fallback news with high-quality generated images
function getDefaultNews(): NewsItem[] {
  return [
    {
      id: 'default-1',
      title: 'BRIDA Badung Gandeng Poltekpar Bali untuk Wisata Gastronomi Berkelanjutan',
      excerpt:
        'Kolaborasi strategis dalam menyusun model wisata gastronomi berbasis big data untuk meningkatkan keterlibatan masyarakat lokal.',
      date: '2026-05-30',
      link: 'https://ppb.ac.id/en/brida-badung-partners-with-poltekpar-bali-to-develop-big-data-based-gastronomy-tourism-model-ensuring-local-residents-benefit-from-tourism/',
      category: 'Kemitraan',
      image: '/news-kemitraan.jpg',
    },
    {
      id: 'default-2',
      title: 'Poltekpar Bali Raih Penghargaan Best Trainee 2025',
      excerpt:
        'Prestasi luar biasa dengan 77 mahasiswa meraih predikat Best Trainee dari berbagai program studi di industri hospitality terkemuka.',
      date: '2026-05-25',
      link: 'https://ppb.ac.id/en/poltekpar-bali-receives-strategic-visit-from-mots-asdep-hali-to-strengthen-foreign-policy-and-international-collaboration/',
      category: 'Prestasi',
      image: '/news-prestasi.jpg',
    },
    {
      id: 'default-3',
      title: 'Rakornas Kementerian Pariwisata: Poltekpar Bali Berkontribusi Aktif',
      excerpt:
        'Politeknik Pariwisata Bali ikut serta dalam Rakornas dalam memperkuat transformasi pariwisata berkelanjutan nasional.',
      date: '2026-05-20',
      link: 'https://ppb.ac.id/en/2026-tourism-ministry-national-coordination-meeting-politeknik-pariwisata-actively-contributes-to-strengthening-sustainable-tourism-transformation/',
      category: 'Acara',
      image: '/news-rakornas.jpg',
    },
  ]
}
