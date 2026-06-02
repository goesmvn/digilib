'use client'

import { useState } from 'react'

const contactInfo = [
  {
    iconType: 'email',
    label: 'Email',
    value: 'perpustakaan@ppb.ac.id',
    link: 'mailto:perpustakaan@ppb.ac.id',
  },
  {
    iconType: 'phone',
    label: 'Telepon',
    value: '+62 361 773537',
    link: 'tel:+62361773537',
  },
  {
    iconType: 'address',
    label: 'Alamat',
    value: 'Jl. Dharmawangsa, Nusa Dua, Badung, Bali 80363',
    link: 'https://maps.app.goo.gl/kqE4b62NdoMVG9pe9',
  },
  {
    iconType: 'hours',
    label: 'Jam Layanan',
    value: 'Senin–Jumat: 07:30–16:00 | Sabtu: 08:00–12:00',
    link: null,
  },
]

function renderContactIcon(type: string) {
  switch (type) {
    case 'email':
      return (
        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    case 'phone':
      return (
        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    case 'address':
      return (
        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    case 'hours':
      return (
        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    default:
      return null
  }
}

export default function KontakPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <main>
      {/* Hero */}
      <section
        className="relative py-20 md:py-28 text-white overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1E5BA8 0%, #0f2c50 50%, #1a4880 100%)' }}
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Hubungi Kami
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Kontak Perpustakaan</h1>
          <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: 'rgba(219,234,254,0.85)' }}>
            Ada pertanyaan atau butuh bantuan? Tim kami siap membantu Anda.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: '#f8faff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-extrabold mb-8 tracking-tight" style={{ color: '#1E5BA8' }}>
                Informasi Kontak
              </h2>

              <div className="space-y-5 mb-10">
                {contactInfo.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-2xl border bg-white transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    style={{ borderColor: 'rgba(30,91,168,0.1)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(30,91,168,0.06)' }}
                    >
                      {renderContactIcon(item.iconType)}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#9ca3af' }}>
                        {item.label}
                      </p>
                      {item.link ? (
                        <a
                          href={item.link}
                          target={item.link.startsWith('http') ? '_blank' : undefined}
                          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="font-bold transition-colors hover:text-blue-700 leading-normal"
                          style={{ color: '#1E5BA8' }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-bold text-gray-700 leading-normal">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div
                className="p-6 rounded-2xl border bg-white"
                style={{ borderColor: 'rgba(30,91,168,0.1)' }}
              >
                <p className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">Ikuti Media Sosial Kami</p>
                <div className="flex gap-3">
                  {[
                    {
                      iconSvg: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                        </svg>
                      ),
                      label: 'Facebook',
                      href: 'https://www.facebook.com/poltekparbali',
                      color: '#1E5BA8',
                    },
                    {
                      iconSvg: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                        </svg>
                      ),
                      label: 'Instagram',
                      href: 'https://www.instagram.com/poltekparbali',
                      color: '#B8432C',
                    },
                    {
                      iconSvg: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      ),
                      label: 'YouTube',
                      href: 'https://www.youtube.com/@politeknikpariwisatabali',
                      color: '#9e3820',
                    },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.label}
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      style={{ background: social.color }}
                    >
                      {social.iconSvg}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-extrabold mb-8 tracking-tight" style={{ color: '#1E5BA8' }}>
                Kirim Pesan
              </h2>

              {submitted ? (
                <div
                  className="p-8 rounded-2xl border bg-white text-center shadow-sm"
                  style={{ borderColor: 'rgba(30,91,168,0.12)' }}
                >
                  <div className="w-16 h-16 bg-green-50 text-green-500 border border-green-150 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-extrabold mb-2" style={{ color: '#1E5BA8' }}>
                    Pesan Terkirim!
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    Terima kasih, <strong>{form.name}</strong>! Tim kami akan segera menghubungi Anda melalui{' '}
                    <span className="text-primary-700 font-semibold">{form.email}</span>.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
                    style={{ background: '#1E5BA8' }}
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-8 rounded-2xl border bg-white space-y-5 shadow-sm"
                  style={{ borderColor: 'rgba(30,91,168,0.12)' }}
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama Anda"
                      className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 text-gray-800 focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20"
                      style={{ borderColor: 'rgba(30,91,168,0.2)', fontSize: '0.95rem' }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="nama@email.com"
                      className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 text-gray-800 focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20"
                      style={{ borderColor: 'rgba(30,91,168,0.2)', fontSize: '0.95rem' }}
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subjek *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 text-gray-800 bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20"
                      style={{ borderColor: 'rgba(30,91,168,0.2)', fontSize: '0.95rem' }}
                    >
                      <option value="">Pilih subjek...</option>
                      <option value="keanggotaan">Pendaftaran Keanggotaan</option>
                      <option value="peminjaman">Informasi Peminjaman</option>
                      <option value="koleksi">Permintaan Koleksi</option>
                      <option value="repository">Repository Penelitian</option>
                      <option value="teknis">Masalah Teknis</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Pesan *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tuliskan pesan Anda di sini..."
                      className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 text-gray-800 resize-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20"
                      style={{ borderColor: 'rgba(30,91,168,0.2)', fontSize: '0.95rem' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl text-white font-bold text-base transition-all duration-300 hover:scale-[1.01] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ background: loading ? '#6b7280' : 'linear-gradient(135deg, #1E5BA8, #1a4f91)' }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Mengirim...
                      </span>
                    ) : (
                      'Kirim Pesan'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Embed */}
      <section className="bg-white pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold flex items-center justify-center gap-2" style={{ color: '#1E5BA8' }}>
              <svg className="w-6 h-6 text-accent-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Lokasi Kami
            </h2>
            <p className="text-gray-500 mt-2 text-sm font-semibold">
              Politeknik Pariwisata Bali — Nusa Dua, Badung, Bali
            </p>
          </div>

          <div
            className="rounded-2xl overflow-hidden border shadow-lg"
            style={{ borderColor: 'rgba(30,91,168,0.12)' }}
          >
            <iframe
              title="Lokasi Perpustakaan Politeknik Pariwisata Bali"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.9248234589!2d115.21861837486!3d-8.808099591278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23d6e0e83b987%3A0x7bc1286a0b0ee21d!2sPoliteknik%20Pariwisata%20Bali!5e0!3m2!1sid!2sid!4v1748878252697!5m2!1sid!2sid"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
