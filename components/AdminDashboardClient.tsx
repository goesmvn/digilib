'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const dashboardTranslations = {
  id: {
    title: 'Panel Kontrol Admin',
    subtitle: 'Kelola publikasi berita eksternal dan agenda kegiatan perpustakaan Politeknik Pariwisata Bali.',
    logoutBtn: 'Keluar Sesi',
    tabNews: 'Manajemen Berita',
    tabEvents: 'Agenda & Acara',
    newsTitle: 'Tambah Berita Baru',
    eventTitle: 'Tambah Acara Baru',
    formTitle: 'Judul Publikasi',
    formExcerpt: 'Kutipan Singkat / Deskripsi',
    formImage: 'URL Foto Cover (opsional)',
    formLink: 'URL Link Sumber (contoh: https://ppb.ac.id/...)',
    formCategory: 'Kategori Berita',
    formDate: 'Tanggal Kegiatan',
    formTime: 'Jam Kegiatan',
    formLocation: 'Lokasi Kegiatan',
    submitBtn: 'Simpan Publikasi',
    submittingBtn: 'Menyimpan...',
    deleteSuccess: 'Item berhasil dihapus!',
    postSuccess: 'Item berhasil ditambahkan!',
    fieldRequired: 'Semua kolom yang wajib diisi harus dilengkapi.',
    listTitleNews: 'Daftar Berita Kustom Aktif',
    listTitleEvents: 'Daftar Acara Kustom Aktif',
    noNews: 'Belum ada berita kustom yang ditambahkan.',
    noEvents: 'Belum ada acara kustom yang ditambahkan.',
    tableTitle: 'Judul',
    tableDate: 'Tanggal / Waktu',
    tableCategory: 'Kategori',
    tableActions: 'Aksi',
    tableLocation: 'Lokasi'
  },
  en: {
    title: 'Admin Control Panel',
    subtitle: 'Manage external news publications and upcoming event agendas for Politeknik Pariwisata Bali library.',
    logoutBtn: 'Logout Session',
    tabNews: 'News Management',
    tabEvents: 'Agendas & Events',
    newsTitle: 'Add New Custom News',
    eventTitle: 'Add New Custom Event',
    formTitle: 'Publication Title',
    formExcerpt: 'Short Excerpt / Description',
    formImage: 'Cover Image URL (optional)',
    formLink: 'Source Link URL (e.g. https://ppb.ac.id/...)',
    formCategory: 'News Category',
    formDate: 'Event Date',
    formTime: 'Event Time',
    formLocation: 'Event Location',
    submitBtn: 'Publish Item',
    submittingBtn: 'Publishing...',
    deleteSuccess: 'Item successfully deleted!',
    postSuccess: 'Item successfully added!',
    fieldRequired: 'All required fields must be completed.',
    listTitleNews: 'Active Custom News List',
    listTitleEvents: 'Active Custom Events List',
    noNews: 'No custom news added yet.',
    noEvents: 'No custom events added yet.',
    tableTitle: 'Title',
    tableDate: 'Date / Time',
    tableCategory: 'Category',
    tableActions: 'Actions',
    tableLocation: 'Location'
  }
}

export default function AdminDashboardClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const langQuery = searchParams.get('lang')
  const lang = (langQuery === 'en' ? 'en' : 'id') as 'id' | 'en'
  const t = dashboardTranslations[lang]

  // State Management
  const [activeTab, setActiveTab] = useState<'news' | 'events'>('news')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  // Lists Data state
  const [newsList, setNewsList] = useState<any[]>([])
  const [eventsList, setEventsList] = useState<any[]>([])

  // Form states - News
  const [newsTitle, setNewsTitle] = useState('')
  const [newsExcerpt, setNewsExcerpt] = useState('')
  const [newsImage, setNewsImage] = useState('')
  const [newsLink, setNewsLink] = useState('')
  const [newsCategory, setNewsCategory] = useState('')

  // Form states - Events
  const [eventTitle, setEventTitle] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [eventLocation, setEventLocation] = useState('')
  const [eventImage, setEventImage] = useState('')

  // Load lists on mount
  useEffect(() => {
    fetchData()
  }, [])

  // Fetch list of custom news and events
  async function fetchData() {
    try {
      const [resNews, resEvents] = await Promise.all([
        fetch('/api/admin/news'),
        fetch('/api/admin/events')
      ])
      if (resNews.ok) {
        const dataNews = await resNews.json()
        setNewsList(dataNews.news || [])
      }
      if (resEvents.ok) {
        const dataEvents = await resEvents.json()
        setEventsList(dataEvents.events || [])
      }
    } catch (e) {
      console.error('Failed to fetch admin data:', e)
    }
  }

  // Handle Logout
  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      // Refresh and hard reload to immediately lock session
      router.refresh()
      window.location.reload()
    } catch (e) {
      console.error('Logout error:', e)
    }
  }

  // Handle Submit News
  async function handleNewsSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)

    if (!newsTitle || !newsExcerpt || !newsLink) {
      setMessage({ text: t.fieldRequired, type: 'error' })
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newsTitle,
          excerpt: newsExcerpt,
          image: newsImage,
          link: newsLink,
          category: newsCategory || 'Berita',
        }),
      })

      if (res.ok) {
        setMessage({ text: t.postSuccess, type: 'success' })
        setNewsTitle('')
        setNewsExcerpt('')
        setNewsImage('')
        setNewsLink('')
        setNewsCategory('')
        fetchData()
      } else {
        setMessage({ text: 'Error posting news item.', type: 'error' })
      }
    } catch (err) {
      setMessage({ text: 'Network error.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  // Handle Submit Event
  async function handleEventSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)

    if (!eventTitle || !eventDate || !eventTime || !eventDescription) {
      setMessage({ text: t.fieldRequired, type: 'error' })
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: eventTitle,
          date: eventDate,
          time: eventTime,
          description: eventDescription,
          location: eventLocation,
          image: eventImage,
        }),
      })

      if (res.ok) {
        setMessage({ text: t.postSuccess, type: 'success' })
        setEventTitle('')
        setEventDate('')
        setEventTime('')
        setEventDescription('')
        setEventLocation('')
        setEventImage('')
        fetchData()
      } else {
        setMessage({ text: 'Error posting event item.', type: 'error' })
      }
    } catch (err) {
      setMessage({ text: 'Network error.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  // Handle Delete News
  async function handleDeleteNews(id: string) {
    if (!confirm(lang === 'en' ? 'Are you sure?' : 'Apakah Anda yakin ingin menghapus?')) return
    setMessage(null)

    try {
      const res = await fetch(`/api/admin/news?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMessage({ text: t.deleteSuccess, type: 'success' })
        fetchData()
      } else {
        setMessage({ text: 'Delete failed.', type: 'error' })
      }
    } catch (err) {
      setMessage({ text: 'Network error.', type: 'error' })
    }
  }

  // Handle Delete Event
  async function handleDeleteEvent(id: string) {
    if (!confirm(lang === 'en' ? 'Are you sure?' : 'Apakah Anda yakin ingin menghapus?')) return
    setMessage(null)

    try {
      const res = await fetch(`/api/admin/events?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMessage({ text: t.deleteSuccess, type: 'success' })
        fetchData()
      } else {
        setMessage({ text: 'Delete failed.', type: 'error' })
      }
    } catch (err) {
      setMessage({ text: 'Network error.', type: 'error' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Dashboard */}
        <div className="bg-primary-950 text-white rounded-3xl p-8 md:p-12 mb-10 shadow-lg border border-primary-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <span className="px-3 py-1 bg-accent-500/20 text-accent-400 border border-accent-500/35 rounded-lg text-xs font-semibold uppercase tracking-wider">
                Library Administrator
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3">{t.title}</h1>
              <p className="text-gray-300 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
                {t.subtitle}
              </p>
            </div>
            
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600/15 hover:bg-red-600 hover:text-white border border-red-500/30 text-red-300 font-bold rounded-xl text-sm transition-all duration-200 shadow-sm shrink-0 flex items-center justify-center gap-2 self-start md:self-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {t.logoutBtn}
            </button>
          </div>
        </div>

        {/* Global Notifications Alert */}
        {message && (
          <div
            className={`mb-8 p-4 rounded-xl border flex items-center gap-3 text-sm font-semibold transition-all shadow-sm ${
              message.type === 'success'
                ? 'bg-emerald-50 border-emerald-250 text-emerald-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            {message.type === 'success' ? (
              <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="flex border-b border-gray-200 mb-8 bg-white p-1.5 rounded-2xl shadow-sm border">
          <button
            onClick={() => { setActiveTab('news'); setMessage(null); }}
            className={`flex-1 py-3 px-4 text-center font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'news'
                ? 'bg-primary-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            {t.tabNews}
          </button>
          
          <button
            onClick={() => { setActiveTab('events'); setMessage(null); }}
            className={`flex-1 py-3 px-4 text-center font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'events'
                ? 'bg-primary-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {t.tabEvents}
          </button>
        </div>

        {/* Dashboard Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Forms input */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-extrabold text-gray-900 border-b border-gray-100 pb-4 mb-5 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-accent-500 rounded-full"></div>
                {activeTab === 'news' ? t.newsTitle : t.eventTitle}
              </h2>

              {activeTab === 'news' ? (
                <form onSubmit={handleNewsSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{t.formTitle} <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                      placeholder="e.g. Pembukaan Layanan E-Journal Kampus"
                      className="w-full px-4 py-2.5 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg text-sm outline-none transition-all placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{t.formExcerpt} <span className="text-red-500">*</span></label>
                    <textarea
                      value={newsExcerpt}
                      onChange={(e) => setNewsExcerpt(e.target.value)}
                      rows={3}
                      placeholder="Ringkasan singkat isi berita..."
                      className="w-full px-4 py-2.5 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg text-sm outline-none transition-all placeholder-gray-400 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{t.formCategory}</label>
                    <input
                      type="text"
                      value={newsCategory}
                      onChange={(e) => setNewsCategory(e.target.value)}
                      placeholder="e.g. Kegiatan, Pengumuman, Prestasi"
                      className="w-full px-4 py-2.5 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg text-sm outline-none transition-all placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{t.formLink} <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={newsLink}
                      onChange={(e) => setNewsLink(e.target.value)}
                      placeholder="e.g. https://ppb.ac.id/news-details"
                      className="w-full px-4 py-2.5 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg text-sm outline-none transition-all placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{t.formImage}</label>
                    <input
                      type="text"
                      value={newsImage}
                      onChange={(e) => setNewsImage(e.target.value)}
                      placeholder="e.g. /my-image.jpg or https://image-url"
                      className="w-full px-4 py-2.5 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg text-sm outline-none transition-all placeholder-gray-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg text-sm transition-all flex items-center justify-center shadow-sm"
                  >
                    {loading ? t.submittingBtn : t.submitBtn}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleEventSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{t.formTitle} <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      placeholder="e.g. Workshop Literasi Database 2026"
                      className="w-full px-4 py-2.5 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg text-sm outline-none transition-all placeholder-gray-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{t.formDate} <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg text-sm outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{t.formTime} <span className="text-red-500">*</span></label>
                      <input
                        type="time"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg text-sm outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{t.formLocation}</label>
                    <input
                      type="text"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      placeholder="e.g. Ruang Baca Utama, Gedung D"
                      className="w-full px-4 py-2.5 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg text-sm outline-none transition-all placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{t.formImage}</label>
                    <input
                      type="text"
                      value={eventImage}
                      onChange={(e) => setEventImage(e.target.value)}
                      placeholder="e.g. /event-image.jpg or https://image-url"
                      className="w-full px-4 py-2.5 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg text-sm outline-none transition-all placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{t.formExcerpt} <span className="text-red-500">*</span></label>
                    <textarea
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      rows={4}
                      placeholder="Deskripsi singkat kegiatan..."
                      className="w-full px-4 py-2.5 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg text-sm outline-none transition-all placeholder-gray-400 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg text-sm transition-all flex items-center justify-center shadow-sm"
                  >
                    {loading ? t.submittingBtn : t.submitBtn}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Data grid lists */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm min-h-[500px]">
              <h2 className="text-lg font-extrabold text-gray-900 border-b border-gray-100 pb-4 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary-500 rounded-full"></div>
                {activeTab === 'news' ? t.listTitleNews : t.listTitleEvents}
              </h2>

              {activeTab === 'news' ? (
                newsList.length === 0 ? (
                  <div className="text-center py-20 text-gray-400">
                    <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <p className="text-sm font-semibold">{t.noNews}</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                      <thead className="bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-wider text-left">
                        <tr>
                          <th className="px-5 py-3">{t.tableTitle}</th>
                          <th className="px-5 py-3">{t.tableCategory}</th>
                          <th className="px-5 py-3 text-right">{t.tableActions}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-150 text-gray-600 font-medium bg-white">
                        {newsList.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-5 py-4">
                              <span className="block font-bold text-gray-900 leading-snug line-clamp-1">{item.title}</span>
                              <span className="block text-xs text-gray-400 font-semibold mt-1">
                                {new Date(item.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </span>
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <span className="px-2.5 py-1 bg-primary-50 text-primary-700 border border-primary-100/50 rounded-md text-xs font-bold uppercase tracking-wider">
                                {item.category || 'Berita'}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => handleDeleteNews(item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center justify-center"
                                title="Delete"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              ) : (
                eventsList.length === 0 ? (
                  <div className="text-center py-20 text-gray-400">
                    <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-semibold">{t.noEvents}</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                      <thead className="bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-wider text-left">
                        <tr>
                          <th className="px-5 py-3">{t.tableTitle}</th>
                          <th className="px-5 py-3">{t.tableDate}</th>
                          <th className="px-5 py-3">{t.tableLocation}</th>
                          <th className="px-5 py-3 text-right">{t.tableActions}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-150 text-gray-600 font-medium bg-white">
                        {eventsList.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-5 py-4">
                              <span className="block font-bold text-gray-900 leading-snug line-clamp-1">{item.title}</span>
                              <span className="block text-xs text-gray-400 line-clamp-1 mt-1 font-medium">{item.description}</span>
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap text-xs">
                              <span className="block font-bold text-gray-700">
                                {new Date(item.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </span>
                              <span className="block text-gray-400 font-semibold mt-0.5">{item.time} WITA</span>
                            </td>
                            <td className="px-5 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap">
                              {item.location || '-'}
                            </td>
                            <td className="px-5 py-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => handleDeleteEvent(item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center justify-center"
                                title="Delete"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
