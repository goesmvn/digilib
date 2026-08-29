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

  async function fetchResults(searchQuery: string, page: number) {
    if (!searchQuery.trim()) return

    setLoading(true)
    setError(null)

    const start = (page - 1) * pageSize

    try {
      const res = await fetch(`/api/scopus/search?q=${encodeURIComponent(searchQuery.trim())}&start=${start}&count=${pageSize}`)
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
    fetchResults(query, 1)
  }

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage)
    fetchResults(query, newPage)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 via-primary-950 to-gray-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
            {isEn ? 'Global Scientific Database' : 'Database Jurnal Ilmiah'}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4">
            {isEn ? 'Scopus Indexed Article Search' : 'Pencarian Artikel Terindeks Scopus'}
          </h2>
          <p className="text-gray-300 text-sm md:text-base mt-3 leading-relaxed">
            {isEn
              ? 'Access international journal metadata, indexed papers, and full-text downloads directly via Digilib integration.'
              : 'Akses metadata jurnal internasional dan simpan daftar artikel untuk didownload saat Anda berada di jaringan/area Perpustakaan.'}
          </p>
          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-xs md:text-sm font-medium inline-flex items-center gap-2 max-w-2xl mx-auto text-left">
            <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {isEn
                ? 'Note: Full-text download access requires campus library IP network. Save articles now and export the list or open them when visiting the library.'
                : 'Informasi: Akses download full-text memerlukan jaringan IP Perpustakaan Kampus. Simpan artikel yang Anda inginkan sekarang, lalu gunakan daftar simpan atau export file TXT untuk dibantu download oleh petugas/admin di Perpustakaan.'}
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row gap-3 bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/15 shadow-2xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isEn ? 'Search keywords, author, or paper title...' : 'Cari kata kunci, penulis, atau judul artikel...'}
              className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-400 outline-none text-sm md:text-base"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-primary-950 font-bold rounded-xl text-sm transition-all duration-200 shadow-md shrink-0 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-950 border-t-transparent rounded-full animate-spin"></div>
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
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/20 border border-red-500/40 rounded-xl text-red-200 text-sm font-semibold text-center backdrop-blur-md">
            {error}
          </div>
        )}

        {/* Results Info & Filter */}
        {total !== null && !error && (
          <div className="mb-6 border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm text-gray-300 font-semibold">{isEn ? `Found ${total} articles` : `Ditemukan ${total} artikel`}</span>
              <button
                onClick={() => setShowSavedModal(true)}
                className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-full text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span>{isEn ? `Saved List (${savedArticles.length})` : `Daftar Simpan (${savedArticles.length})`}</span>
              </button>
            </div>

            {/* Quick Stat Counter Bar */}
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-md font-medium">
                {isEn ? `ScienceDirect: ${results.filter(r => r.isScienceDirect).length}` : `ScienceDirect: ${results.filter(r => r.isScienceDirect).length}`}
              </span>
              <span className="px-2.5 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md font-medium">
                {isEn ? `Open Access: ${results.filter(r => r.isOpenAccess && !r.isScienceDirect).length}` : `Open Access: ${results.filter(r => r.isOpenAccess && !r.isScienceDirect).length}`}
              </span>
              <span className="text-xs text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 hidden md:inline-block">
                Source From Elsevier Scopus
              </span>
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((item) => (
            <div key={item.id} className="bg-white/5 border border-white/10 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-2">
                  <div className="flex items-center gap-2 truncate max-w-[280px]">
                    <span className="truncate">{item.publicationName || 'Scopus Journal'}</span>
                    {item.isScienceDirect && (
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] shrink-0">
                        ScienceDirect
                      </span>
                    )}
                    {item.isOpenAccess && (
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded text-[10px] shrink-0">
                        Open Access
                      </span>
                    )}
                  </div>
                  <span>{item.coverDate?.substring(0, 4) || ''}</span>
                </div>
                
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                
                <p className="text-xs text-gray-400 font-medium mt-2">
                  <span className="font-semibold text-gray-300">{isEn ? 'Author:' : 'Penulis:'}</span> {item.creator}
                </p>

                {item.doi && (
                  <p className="text-xs text-gray-400 font-mono mt-1">
                    DOI: {item.doi}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-gray-400">
                  {isEn ? `Cites: ${item.citedByCount}` : `Dikutip: ${item.citedByCount}`}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSaveArticle(item)}
                    title={isEn ? 'Save for campus download' : 'Simpan untuk di-download di kampus'}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                      savedArticles.some(a => a.id === item.id)
                        ? 'bg-amber-500 text-gray-950 font-bold'
                        : 'bg-white/10 hover:bg-white/20 text-white'
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
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-all"
                    >
                      {isEn ? 'Scopus Link' : 'Buka Scopus'}
                    </a>
                  )}

                  {item.downloadUrl && (
                    <a
                      href={item.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-primary-950 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
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
              className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-all"
            >
              {isEn ? 'Previous' : 'Sebelumnya'}
            </button>
            
            <span className="text-xs font-semibold text-gray-300 px-3">
              {isEn 
                ? `Page ${currentPage} of ${Math.ceil(total / pageSize)}`
                : `Halaman ${currentPage} dari ${Math.ceil(total / pageSize)}`}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= Math.ceil(total / pageSize) || loading}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-all"
            >
              {isEn ? 'Next' : 'Selanjutnya'}
            </button>
          </div>
        )}

        {/* Modal Saved List */}
        {showSavedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-gray-900 border border-white/15 rounded-2xl p-6 max-w-2xl w-full text-white shadow-2xl relative max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-amber-400">
                    {isEn ? 'Saved Articles to Download at Library' : 'Daftar Artikel untuk Di-download di Perpustakaan'}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {isEn 
                      ? 'Saved links remain stored in your browser. Download full-text articles directly when connected to the campus library network or hand over the exported TXT file to library staff.'
                      : 'Daftar link artikel tersimpan di browser Anda. Artikel full-text bisa di-download saat terhubung ke jaringan perpustakaan kampus atau dengan menyerahkan hasil export file TXT ke petugas/admin perpustakaan.'}
                  </p>
                </div>
                <button
                  onClick={() => setShowSavedModal(false)}
                  className="text-gray-400 hover:text-white text-lg font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <div className="overflow-y-auto flex-1 space-y-3 pr-2">
                {savedArticles.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-8">
                    {isEn ? 'No articles saved yet.' : 'Belum ada artikel yang disimpan.'}
                  </p>
                ) : (
                  savedArticles.map((article) => (
                    <div key={article.id} className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white truncate">{article.title}</h4>
                          {article.isScienceDirect && (
                            <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[9px] shrink-0">
                              ScienceDirect
                            </span>
                          )}
                          {article.isOpenAccess && !article.isScienceDirect && (
                            <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded text-[9px] shrink-0">
                              Open Access
                            </span>
                          )}
                        </div>
                        {article.doi && <p className="text-xs text-gray-400 font-mono mt-0.5">DOI: {article.doi}</p>}
                        <p className="text-[10px] text-amber-400/80 mt-1">{isEn ? 'Saved on:' : 'Disimpan:'} {article.savedAt}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={article.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-gray-950 text-xs font-bold rounded-lg transition-all"
                        >
                          {isEn ? 'Open Link' : 'Buka Link'}
                        </a>
                        <button
                          onClick={() => {
                            const updated = savedArticles.filter(a => a.id !== article.id)
                            setSavedArticles(updated)
                            localStorage.setItem('digilib_saved_articles', JSON.stringify(updated))
                          }}
                          className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
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

              <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between gap-3 flex-wrap">
                <span className="text-xs text-gray-400">
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
                      className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-gray-950 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{isEn ? 'Export TXT for Admin' : 'Download TXT untuk Admin'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => setShowSavedModal(false)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-lg text-white"
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
