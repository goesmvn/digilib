import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tentang Perpustakaan | Perpustakaan Politeknik Pariwisata Bali',
  description:
    'Tentang Perpustakaan Politeknik Pariwisata Bali — visi, misi, sejarah, jam operasional, dan layanan yang tersedia.',
}

const operationalHours = [
  { day: 'Senin – Jumat', hours: '07:30 – 16:00 WITA', status: 'regular' },
  { day: 'Sabtu', hours: '08:00 – 12:00 WITA', status: 'regular' },
  { day: 'Minggu & Hari Libur', hours: 'Tutup', status: 'closed' },
]

const teams = [
  { name: 'Kepala Perpustakaan', role: 'Manajemen & Kebijakan', iconType: 'manager' },
  { name: 'Pustakawan', role: 'Layanan Referensi & Koleksi', iconType: 'books' },
  { name: 'Staff Sirkulasi', role: 'Peminjaman & Pengembalian', iconType: 'circulation' },
  { name: 'Staff IT', role: 'Sistem Digital & SLiMS', iconType: 'it' },
]

const milestones = [
  { year: '2001', event: 'Perpustakaan PPB didirikan bersamaan dengan berdirinya Politeknik Pariwisata Bali.' },
  { year: '2010', event: 'Implementasi sistem manajemen perpustakaan digital pertama.' },
  { year: '2017', event: 'Integrasi dengan sistem SLiMS untuk pengelolaan koleksi terotomasi.' },
  { year: '2021', event: 'Peluncuran repository penelitian digital untuk karya ilmiah mahasiswa & dosen.' },
  { year: '2024', event: 'Ekspansi koleksi e-journal dan sumber belajar digital premium.' },
  { year: '2026', event: 'Platform digilib baru — akses perpustakaan dari mana saja, kapan saja.' },
]

function renderTeamIcon(iconName: string) {
  switch (iconName) {
    case 'manager':
      return (
        <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    case 'books':
      return (
        <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    case 'circulation':
      return (
        <svg className="w-7 h-7 text-accent-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    case 'it':
      return (
        <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    default:
      return null
  }
}

function renderOperationalIcon(status: string) {
  if (status === 'closed') {
    return (
      <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  }
  return (
    <svg className="w-5 h-5 text-primary-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )
}

export default function TentangPage() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative py-20 md:py-28 text-white overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1E5BA8 0%, #0f2c50 50%, #1a4880 100%)',
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
            style={{
              background: 'rgba(212,175,55,0.15)',
              color: '#D4AF37',
              borderColor: 'rgba(212,175,55,0.3)',
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Profil Institusi
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
            Tentang Perpustakaan
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto font-medium" style={{ color: 'rgba(219,234,254,0.85)' }}>
            Pusat informasi dan pembelajaran yang melayani civitas akademika Politeknik Pariwisata Bali
          </p>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-16 md:py-20" style={{ background: '#f8faff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visi */}
            <div
              className="p-8 rounded-2xl border bg-white group hover:shadow-xl transition-all duration-300"
              style={{ borderColor: 'rgba(30,91,168,0.1)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(30,91,168,0.06)' }}
              >
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#1E5BA8' }}>Visi</h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Menjadi perpustakaan digital terdepan yang mendukung pengembangan akademik, 
                penelitian, dan inovasi di bidang pariwisata melalui layanan informasi yang 
                berkualitas, modern, dan mudah diakses oleh seluruh civitas akademika.
              </p>
            </div>

            {/* Misi */}
            <div
              className="p-8 rounded-2xl border bg-white group hover:shadow-xl transition-all duration-300"
              style={{ borderColor: 'rgba(30,91,168,0.1)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(212,175,55,0.08)' }}
              >
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41a14.96 14.96 0 00-2.58 5.84m8.54-2.58L9.63 17.5M3 21l3-3m0 0L3 14m3 4l4 3" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#1E5BA8' }}>Misi</h2>
              <ul className="space-y-2.5 text-gray-600 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary-600 flex-shrink-0 font-bold">✦</span>
                  Menyediakan koleksi buku, jurnal, dan e-resources yang relevan dan mutakhir
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary-600 flex-shrink-0 font-bold">✦</span>
                  Mengembangkan layanan digital terintegrasi melalui sistem SLiMS
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary-600 flex-shrink-0 font-bold">✦</span>
                  Mendorong budaya literasi dan riset di lingkungan kampus
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary-600 flex-shrink-0 font-bold">✦</span>
                  Memfasilitasi publikasi hasil penelitian mahasiswa dan dosen
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Jam Operasional */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border border-primary-100"
              style={{ background: 'rgba(30,91,168,0.06)', color: '#1E5BA8' }}
            >
              <svg className="w-3.5 h-3.5 text-primary-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Jam Layanan
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: '#1E5BA8' }}>Jam Operasional</h2>
          </div>

          <div
            className="rounded-2xl overflow-hidden border bg-white"
            style={{ borderColor: 'rgba(30,91,168,0.12)' }}
          >
            {operationalHours.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-5 border-b last:border-b-0 transition-colors hover:bg-blue-50/50"
                style={{ borderColor: 'rgba(30,91,168,0.08)' }}
              >
                <div className="flex items-center gap-3">
                  {renderOperationalIcon(item.status)}
                  <span className="font-semibold text-gray-800">{item.day}</span>
                </div>
                <span
                  className="px-4 py-1.5 rounded-full text-xs font-bold"
                  style={
                    item.status === 'closed'
                      ? { background: '#fee2e2', color: '#b91c1c' }
                      : { background: 'rgba(30,91,168,0.08)', color: '#1E5BA8' }
                  }
                >
                  {item.hours}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-500 mt-4 font-medium">
            * Jam operasional dapat berubah pada hari-hari libur nasional atau cuti bersama.
          </p>
        </div>
      </section>

      {/* Sejarah / Milestones */}
      <section className="py-16 md:py-20" style={{ background: '#f8faff' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border border-primary-100"
              style={{ background: 'rgba(30,91,168,0.06)', color: '#1E5BA8' }}
            >
              <svg className="w-3.5 h-3.5 text-primary-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Perjalanan Kami
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: '#1E5BA8' }}>Sejarah Singkat</h2>
          </div>

          <div className="relative">
            <div
              className="absolute left-8 top-0 bottom-0 w-0.5 hidden sm:block"
              style={{ background: 'linear-gradient(to bottom, #1E5BA8, #D4AF37)' }}
            />

            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white text-xs font-black z-10 transition-transform duration-300 group-hover:scale-110 shadow-sm"
                    style={{ background: 'linear-gradient(135deg, #1E5BA8, #D4AF37)' }}
                  >
                    {m.year}
                  </div>
                  <div
                    className="flex-1 p-5 rounded-2xl border bg-white transition-all duration-300 group-hover:shadow-md"
                    style={{ borderColor: 'rgba(30,91,168,0.1)' }}
                  >
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tim Perpustakaan */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border border-primary-100"
              style={{ background: 'rgba(30,91,168,0.06)', color: '#1E5BA8' }}
            >
              <svg className="w-3.5 h-3.5 text-primary-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Tim Kami
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: '#1E5BA8' }}>Staf Perpustakaan</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teams.map((member, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl border bg-gray-50/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white"
                style={{ borderColor: 'rgba(30,91,168,0.1)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-150 flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
                  {renderTeamIcon(member.iconType)}
                </div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">{member.name}</h3>
                <p className="text-xs text-gray-500 font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #1E5BA8, #0f2c50)' }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight">Siap Menjelajahi Koleksi?</h2>
          <p className="mb-8 text-sm md:text-base" style={{ color: 'rgba(219,234,254,0.85)' }}>
            Akses ribuan buku, jurnal, dan repository penelitian secara online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://library.ppb.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow hover:shadow-lg"
              style={{ background: '#D4AF37', color: 'white' }}
            >
              Kunjungi SLiMS
            </a>
            <a
              href="/kontak"
              className="px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)' }}
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
