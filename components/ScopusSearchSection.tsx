'use client'

import { useState, useEffect } from 'react'

interface ScopusItem {
  id: string
  title: string
  creator: string
  publicationName: string
  publisher?: string
  coverDate: string
  doi: string
  citedByCount: string
  scopusUrl: string
  downloadUrl: string | null
  isOpenAccess?: boolean
  isScienceDirect?: boolean
}

interface SavedArticle {
  id: string
  title: string
  doi: string
  downloadUrl: string
  savedAt: string
  isScienceDirect?: boolean
  isOpenAccess?: boolean
}

export default function ScopusSearchSection({ lang }: { lang: 'id' | 'en' }) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ScopusItem[]>([])
  const [total, setTotal] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [yearFilter, setYearFilter] = useState('')
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([])
  const [showSavedModal, setShowSavedModal] = useState(false)
  const pageSize = 10

  const isEn = lang === 'en'

  useEffect(() => {
    try {
      const stored = localStorage.getItem('digilib_saved_articles')
      if (stored) setSavedArticles(JSON.parse(stored))
    } catch (e) {
      console.error('Failed to load saved articles', e)
    }
  }, [])

  function toggleSaveArticle(item: ScopusItem) {
    if (!item.doi && !item.scopusUrl) return
    const url = item.doi ? `https://doi.org/${item.doi}` : item.scopusUrl
    const existingIndex = savedArticles.findIndex(a => a.id === item.id)

    let updated: SavedArticle[]
    if (existingIndex >= 0) {
      updated = savedArticles.filter(a => a.id !== item.id)
    } else {
      updated = [
        ...savedArticles,
        {
          id: item.id,
          title: item.title,
          doi: item.doi,
          downloadUrl: url,
          savedAt: new Date().toLocaleDateString(),
          isScienceDirect: item.isScienceDirect,
          isOpenAccess: item.isOpenAccess
        }
      ]
    }
    setSavedArticles(updated)
    localStorage.setItem('digilib_saved_articles', JSON.stringify(updated))
  }

  async function fetchResults(searchQuery: string, page: number, year: string = yearFilter) {
    if (!searchQuery.trim()) return

    setLoading(true)
    setError(null)

    const start = (page - 1) * pageSize

    try {
      let url = `/api/scopus/search?q=${encodeURIComponent(searchQuery.trim())}&start=${start}&count=${pageSize}`
      if (year) {
        url += `&year=${encodeURIComponent(year)}`
      }
      const res = await fetch(url)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || (isEn ? 'Failed to search Scopus' : 'Gagal mencari di Scopus'))
        setResults([])
        setTotal(null)
        return
      }

      setResults(data.results || [])
      setTotal(data.totalResults || 0)
    } catch (err) {
      console.error(err)
      setError(isEn ? 'Network error when connecting to Scopus service.' : 'Kesalahan jaringan saat menghubungkan ke Scopus.')
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setCurrentPage(1)
    fetchResults(query, 1, yearFilter)
  }

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage)
    fetchResults(query, newPage, yearFilter)
  }

  function handleYearChange(selectedYear: string) {
    setYearFilter(selectedYear)
    setCurrentPage(1)
    if (query.trim()) {
      fetchResults(query, 1, selectedYear)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 via-slate-50 to-gray-100/60 text-gray-900 border-t border-b border-gray-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3.5 py-1.5 bg-primary-900/10 text-primary-900 border border-primary-900/20 rounded-full text-xs font-bold uppercase tracking-wider">
            {isEn ? 'Global Scientific Database' : 'Database Jurnal Ilmiah'}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary-900 mt-4">
            {isEn ? 'Scopus Indexed Article Search' : 'Pencarian Artikel Terindeks Scopus'}
          </h2>
          <p className="text-gray-600 text-sm md:text-base mt-3 leading-relaxed">
            {isEn
              ? 'Access international journal metadata, indexed papers, and full-text downloads directly via Digilib integration.'
              : 'Akses metadata jurnal internasional dan simpan daftar artikel untuk didownload saat Anda berada di jaringan/area Perpustakaan.'}
          </p>
          <div className="mt-4 p-3.5 bg-accent-50/70 border border-accent-200/80 rounded-xl text-primary-900 text-xs md:text-sm font-medium inline-flex items-center gap-2.5 max-w-2xl mx-auto text-left shadow-sm">
            <svg className="w-5 h-5 text-accent-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {isEn
                ? 'Note: Full-text download access requires campus library IP network. Save articles now and export the list or open them when visiting the library.'
                : 'Informasi: Akses download full-text memerlukan jaringan IP Perpustakaan Kampus. Simpan artikel yang Anda inginkan sekarang, lalu gunakan daftar simpan atau export file TXT untuk dibantu download oleh petugas/admin di Perpustakaan.'}
            </span>
          </div>
        </div>

        {/* Search Bar & Year Filter */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row gap-3 bg-white p-2.5 rounded-2xl border border-gray-200 shadow-md">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isEn ? 'Search keywords, author, or paper title...' : 'Cari kata kunci, penulis, atau judul artikel...'}
              className="flex-1 bg-transparent px-4 py-3 text-gray-900 placeholder-gray-400 outline-none text-sm md:text-base"
            />
            
            <select
              value={yearFilter}
              onChange={(e) => handleYearChange(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-800 text-xs md:text-sm font-semibold rounded-xl px-3 py-3 outline-none cursor-pointer hover:bg-gray-100 transition-colors shrink-0"
            >
              <option value="">{isEn ? 'All Years' : 'Semua Tahun'}</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2015">2015 - 2017</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="px-7 py-3.5 bg-gradient-to-r from-primary-900 via-primary-800 to-accent-600 hover:from-primary-800 hover:to-accent-500 text-white font-bold rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-lg shrink-0 flex items-center justify-center gap-2 border border-accent-400/30"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isEn ? 'Searching...' : 'Mencari...'}</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>{isEn ? 'Search Scopus' : 'Cari Scopus'}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Error Alert */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-semibold text-center shadow-sm">
            {error}
          </div>
        )}

        {/* Results Info & Filter */}
        {total !== null && !error && (
          <div className="mb-6 border-b border-gray-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm text-gray-700 font-semibold">{isEn ? `Found ${total} articles` : `Ditemukan ${total} artikel`}</span>
              <button
                onClick={() => setShowSavedModal(true)}
                className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 rounded-full text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span>{isEn ? `Saved List (${savedArticles.length})` : `Daftar Simpan (${savedArticles.length})`}</span>
              </button>
            </div>

            {/* Quick Stat Counter Bar */}
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md font-medium">
                {isEn ? `ScienceDirect: ${results.filter(r => r.isScienceDirect).length}` : `ScienceDirect: ${results.filter(r => r.isScienceDirect).length}`}
              </span>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-md font-medium">
                {isEn ? `Open Access: ${results.filter(r => r.isOpenAccess && !r.isScienceDirect).length}` : `Open Access: ${results.filter(r => r.isOpenAccess && !r.isScienceDirect).length}`}
              </span>
              <span className="text-xs text-primary-900 bg-primary-50 px-3 py-1 rounded-full border border-primary-100 hidden md:inline-block font-semibold">
                Source From Elsevier Scopus
              </span>
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200/90 hover:border-primary-900/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between text-xs text-primary-900 font-bold mb-2">
                  <div className="flex items-center gap-2 truncate max-w-[280px]">
                    <span className="truncate">{item.publicationName || 'Scopus Journal'}</span>
                    {item.isScienceDirect && (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[10px] shrink-0 font-semibold">
                        ScienceDirect
                      </span>
                    )}
                    {item.isOpenAccess && (
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded text-[10px] shrink-0 font-semibold">
                        Open Access
                      </span>
                    )}
                  </div>
                  <span className="text-gray-500 font-medium">{item.coverDate?.substring(0, 4) || ''}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-900 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                
                <p className="text-xs text-gray-600 font-medium mt-2">
                  <span className="font-semibold text-gray-700">{isEn ? 'Author:' : 'Penulis:'}</span> {item.creator}
                </p>

                {item.doi && (
                  <p className="text-xs text-gray-500 font-mono mt-1">
                    DOI: {item.doi}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-150 flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-gray-500">
                  {isEn ? `Cites: ${item.citedByCount}` : `Dikutip: ${item.citedByCount}`}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSaveArticle(item)}
                    title={isEn ? 'Save for campus download' : 'Simpan untuk di-download di kampus'}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm ${
                      savedArticles.some(a => a.id === item.id)
                        ? 'bg-accent-500 hover:bg-accent-600 text-white border border-accent-400'
                        : 'bg-primary-900 hover:bg-primary-800 text-white border border-primary-800'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill={savedArticles.some(a => a.id === item.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span>{savedArticles.some(a => a.id === item.id) ? (isEn ? 'Saved' : 'Tersimpan') : (isEn ? 'Bookmark' : 'Simpan')}</span>
                  </button>

                  {item.scopusUrl && (
                    <a
                      href={item.scopusUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-primary-900 hover:bg-primary-800 text-white rounded-lg text-xs font-semibold transition-all border border-primary-800 shadow-sm"
                    >
                      {isEn ? 'Scopus Link' : 'Buka Scopus'}
                    </a>
                  )}

                  {item.downloadUrl && (
                    <a
                      href={item.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-accent-500 hover:bg-accent-600 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm border border-accent-400/50"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>{isEn ? 'Download / DOI' : 'Akses Artikel'}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {total !== null && total > pageSize && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1 || loading}
              className="px-4 py-2 bg-primary-900 hover:bg-primary-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-all shadow-sm border border-primary-800"
            >
              {isEn ? 'Previous' : 'Sebelumnya'}
            </button>
            
            <span className="text-xs font-semibold text-primary-950 px-3">
              {isEn 
                ? `Page ${currentPage} of ${Math.ceil(total / pageSize)}`
                : `Halaman ${currentPage} dari ${Math.ceil(total / pageSize)}`}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= Math.ceil(total / pageSize) || loading}
              className="px-4 py-2 bg-primary-900 hover:bg-primary-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-all shadow-sm border border-primary-800"
            >
              {isEn ? 'Next' : 'Selanjutnya'}
            </button>
          </div>
        )}

        {/* Modal Saved List */}
        {showSavedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-2xl w-full text-gray-900 shadow-2xl relative max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-primary-900">
                    {isEn ? 'Saved Articles to Download at Library' : 'Daftar Artikel untuk Di-download di Perpustakaan'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {isEn 
                      ? 'Saved links remain stored in your browser. Download full-text articles directly when connected to the campus library network or hand over the exported TXT file to library staff.'
                      : 'Daftar link artikel tersimpan di browser Anda. Artikel full-text bisa di-download saat terhubung ke jaringan perpustakaan kampus atau dengan menyerahkan hasil export file TXT ke petugas/admin perpustakaan.'}
                  </p>
                </div>
                <button
                  onClick={() => setShowSavedModal(false)}
                  className="text-gray-400 hover:text-gray-700 text-lg font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <div className="overflow-y-auto flex-1 space-y-3 pr-2">
                {savedArticles.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-8">
                    {isEn ? 'No articles saved yet.' : 'Belum ada artikel yang disimpan.'}
                  </p>
                ) : (
                  savedArticles.map((article) => (
                    <div key={article.id} className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">{article.title}</h4>
                          {article.isScienceDirect && (
                            <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[9px] shrink-0 font-semibold">
                              ScienceDirect
                            </span>
                          )}
                          {article.isOpenAccess && !article.isScienceDirect && (
                            <span className="px-1.5 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded text-[9px] shrink-0 font-semibold">
                              Open Access
                            </span>
                          )}
                        </div>
                        {article.doi && <p className="text-xs text-gray-500 font-mono mt-0.5">DOI: {article.doi}</p>}
                        <p className="text-[10px] text-amber-700 font-medium mt-1">{isEn ? 'Saved on:' : 'Disimpan:'} {article.savedAt}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={article.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-primary-900 hover:bg-primary-800 text-white text-xs font-bold rounded-lg transition-all shadow-sm"
                        >
                          {isEn ? 'Open Link' : 'Buka Link'}
                        </a>
                        <button
                          onClick={() => {
                            const updated = savedArticles.filter(a => a.id !== article.id)
                            setSavedArticles(updated)
                            localStorage.setItem('digilib_saved_articles', JSON.stringify(updated))
                          }}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                          title={isEn ? 'Remove' : 'Hapus'}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-4 border-t border-gray-200 mt-4 flex items-center justify-between gap-3 flex-wrap">
                <span className="text-xs text-gray-500">
                  {isEn ? `Total saved: ${savedArticles.length}` : `Total tersimpan: ${savedArticles.length}`}
                </span>

                <div className="flex items-center gap-2">
                  {savedArticles.length > 0 && (
                    <button
                      onClick={() => {
                        const lines = savedArticles.map((a, i) => {
                          const tag = a.isScienceDirect ? '[ScienceDirect - Bisa Didownload Perpustakaan]' : a.isOpenAccess ? '[Open Access - Gratis Terbuka]' : '[Penerbit Lain - Memerlukan Langganan]'
                          return `${i + 1}. ${a.title}\n   Status: ${tag}\n   DOI: ${a.doi || '-'}\n   URL: ${a.downloadUrl}\n   Tanggal Simpan: ${a.savedAt}\n`
                        })
                        const sdCount = savedArticles.filter(a => a.isScienceDirect).length
                        const oaCount = savedArticles.filter(a => a.isOpenAccess && !a.isScienceDirect).length
                        const otherCount = savedArticles.length - sdCount - oaCount

                        const header = `DAFTAR PERMINTAAN DOWNLOAD ARTIKEL PERPUSTAKAAN\nTanggal Export: ${new Date().toLocaleDateString()}\nTotal Artikel: ${savedArticles.length} (ScienceDirect: ${sdCount}, Open Access: ${oaCount}, Lainnya: ${otherCount})\nCatatan: Admin Perpustakaan hanya dapat mengunduh artikel dengan status ScienceDirect / Elsevier.\n--------------------------------------------------\n\n`
                        const content = header + lines.join('\n')
                        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
                        const url = URL.createObjectURL(blob)
                        const link = document.createElement('a')
                        link.href = url
                        link.download = `Permintaan_Download_Artikel_${Date.now()}.txt`
                        link.click()
                        URL.revokeObjectURL(url)
                      }}
                      className="px-3.5 py-2 bg-accent-500 hover:bg-accent-600 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-md border border-accent-400"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{isEn ? 'Export TXT for Admin' : 'Download TXT untuk Admin'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => setShowSavedModal(false)}
                    className="px-4 py-2 bg-primary-900 hover:bg-primary-800 text-xs font-semibold rounded-lg text-white transition-all"
                  >
                    {isEn ? 'Close' : 'Tutup'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
