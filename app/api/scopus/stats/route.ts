import { NextResponse } from 'next/server'
import { getScopusConfig } from '@/lib/scopus'

export async function GET() {
  const config = await getScopusConfig()

  if (!config.apiKey) {
    return NextResponse.json({
      kepariwisataan: 54300,
      hospitality: 32100,
      perjalanan: 18400,
      isFallback: true
    })
  }

  try {
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'X-ELS-APIKey': config.apiKey
    }

    if (config.instToken) {
      headers['X-ELS-Insttoken'] = config.instToken
    }

    const fetchTotal = async (query: string) => {
      const url = new URL('https://api.elsevier.com/content/search/scopus')
      url.searchParams.set('query', query)
      url.searchParams.set('count', '1')

      const res = await fetch(url.toString(), { headers, next: { revalidate: 3600 } })
      if (!res.ok) return null
      const data = await res.json()
      const searchResults = data['search-results'] || {}
      return parseInt(searchResults['opensearch:totalResults'] || '0', 10)
    }

    // Fetch stats based on 3 main Jurusan in Poltekpar Bali:
    // 1. Jurusan Kepariwisataan (Tourism Destination, Cultural Tourism, Event Management)
    // 2. Jurusan Hospitality (Culinary Art, Hotel Management, Food & Beverage)
    // 3. Jurusan Perjalanan (Travel Industry, Tour & Travel)
    // Fetch stats based on the exact 2 main Jurusan & Prodi of Poltekpar Bali:
    // 1. Jurusan Kepariwisataan: Destinasi Pariwisata (DEP), Usaha Perjalanan Wisata (UPW), Pengelolaan Konvensi & Acara (PKA)
    // 2. Jurusan Hospitaliti: Pengelolaan Perhotelan (PPH), Manajemen Akuntansi Hospitaliti (MAH), Divisi Kamar (DIK), Seni Kuliner (SKU), Tata Hidang (TAH)
    // Fetch expanded discipline stats using TITLE-ABS-KEY across broad hospitality & tourism fields:
    const [hospitalityCount, kepariwisataanCount] = await Promise.all([
      fetchTotal('TITLE-ABS-KEY(Hospitality OR Hotel OR Culinary OR Restaurant OR "Food & Beverage" OR "Room Division" OR Catering)'),
      fetchTotal('TITLE-ABS-KEY(Tourism OR "Travel Industry" OR Destination OR "Event Management" OR Convention OR MICE OR Eco-Tourism)')
    ])

    const hVal = hospitalityCount || 485200
    const kVal = kepariwisataanCount || 1245800
    const totalVal = hVal + kVal

    return NextResponse.json({
      hospitality: hVal,
      kepariwisataan: kVal,
      totalArticles: totalVal,
      isFallback: !hospitalityCount
    })
  } catch (e) {
    console.error('Failed to fetch Scopus stats from Elsevier API:', e)
    return NextResponse.json({
      kepariwisataan: 54300,
      hospitality: 32100,
      perjalanan: 18400,
      isFallback: true
    })
  }
}
