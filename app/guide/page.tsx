import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Panduan SLiMS | Perpustakaan Politeknik Pariwisata Bali',
  description:
    'Panduan lengkap penggunaan sistem perpustakaan SLiMS bagi mahasiswa Politeknik Pariwisata Bali.',
}

interface PageProps {
  searchParams: Promise<{ lang?: string }>
}

// Translations structure for the Guide Page
const t = {
  id: {
    heroTitle: 'Panduan Penggunaan SLiMS',
    heroSub: 'Panduan praktis sistem manajemen perpustakaan digital untuk mahasiswa Politeknik Pariwisata Bali',
    badge: 'Panduan Mahasiswa',
    backBtn: '← Kembali ke Beranda',
    ctaHeader: 'Butuh Bantuan Lebih Lanjut?',
    ctaSub: 'Jika Anda mengalami kesulitan login atau masalah keanggotaan, silakan hubungi meja layanan perpustakaan.',
    ctaBtn: 'Hubungi Kontak Layanan',
    
    sections: [
      {
        id: 'akses-akun',
        title: '1. Akses & Login Akun SLiMS',
        desc: 'Semua mahasiswa aktif Politeknik Pariwisata Bali secara otomatis terdaftar sebagai anggota perpustakaan.',
        steps: [
          {
            label: 'Alamat Portal',
            value: 'Buka peramban dan kunjungi situs resmi SLiMS Perpustakaan di https://library.ppb.ac.id'
          },
          {
            label: 'Kredensial Login',
            value: 'Pilih opsi "Member Area" atau "Area Anggota". Masukkan NIM sebagai username Anda, dan gunakan kata sandi default portal mahasiswa Anda (atau hubungi pustakawan jika belum pernah diaktivasi).'
          },
          {
            label: 'Ubah Sandi',
            value: 'Demi keamanan, segera ubah kata sandi default Anda di menu profil setelah berhasil login pertama kali.'
          }
        ]
      },
      {
        id: 'pencarian-opac',
        title: '2. Pencarian Katalog Online (OPAC)',
        desc: 'OPAC (Online Public Access Catalog) memungkinkan Anda mencari koleksi buku fisik maupun digital secara online.',
        steps: [
          {
            label: 'Kotak Pencarian',
            value: 'Masukkan kata kunci seperti judul buku, nama penulis, atau subjek mata kuliah pada kolom pencarian di halaman depan SLiMS.'
          },
          {
            label: 'Filter Pencarian',
            value: 'Gunakan fitur "Advanced Search" untuk mempersempit pencarian berdasarkan tahun terbit, tipe koleksi (buku, jurnal, e-book), atau bahasa.'
          },
          {
            label: 'Status Ketersediaan',
            value: 'Perhatikan label status buku: "Available" berarti siap dipinjam di rak, "On Loan" sedang dipinjam, atau "Reference Only" hanya boleh dibaca di tempat.'
          }
        ]
      },
      {
        id: 'peminjaman-durasi',
        title: '3. Aturan Peminjaman & Denda',
        desc: 'Patuhi kebijakan sirkulasi perpustakaan berikut untuk kenyamanan bersama seluruh civitas akademika:',
        steps: [
          {
            label: 'Kuota Maksimal',
            value: 'Setiap mahasiswa berhak meminjam maksimal hingga 3 eksemplar buku sekaligus.'
          },
          {
            label: 'Durasi Peminjaman',
            value: 'Buku dapat dipinjam selama maksimal 7 hari kalender. Anda dapat melakukan perpanjangan sirkulasi 1 kali (tambahan 7 hari) via Area Anggota sebelum masa pinjam berakhir.'
          },
          {
            label: 'Denda Keterlambatan',
            value: 'Keterlambatan pengembalian buku akan dikenakan denda administratif sebesar Rp 1.000,- per hari untuk setiap buku.'
          }
        ]
      },
      {
        id: 'bebas-pustaka',
        title: '4. Layanan Bebas Pustaka',
        desc: 'Surat Bebas Pustaka merupakan syarat wajib bagi mahasiswa tingkat akhir untuk melakukan sidang skripsi/tugas akhir maupun yudisium kelulusan.',
        steps: [
          {
            label: 'Ketentuan Utama',
            value: 'Mahasiswa tidak boleh memiliki pinjaman buku aktif yang belum dikembalikan atau tunggakan denda administratif apa pun dalam sistem SLiMS.'
          },
          {
            label: 'Penyerahan Karya Ilmiah',
            value: 'Telah menyerahkan salinan tugas akhir/skripsi yang telah disetujui dalam bentuk fisik (hardcopy) dan mengunggah format digital (PDF) ke sistem repository institusi.'
          },
          {
            label: 'Penerbitan Surat',
            value: 'Pengajuan surat bebas pustaka dapat diproses langsung di konter layanan sirkulasi perpustakaan atau secara digital melalui menu sirkulasi Area Anggota.'
          }
        ]
      }
    ]
  },
  en: {
    heroTitle: 'SLiMS Usage Guide',
    heroSub: 'Practical guide to the digital library management system for students of Politeknik Pariwisata Bali',
    badge: 'Student Guide',
    backBtn: '← Back to Home',
    ctaHeader: 'Need Further Assistance?',
    ctaSub: 'If you experience login difficulties or membership issues, please contact the library service desk.',
    ctaBtn: 'Contact Service Desk',
    
    sections: [
      {
        id: 'akses-akun',
        title: '1. Accessing & Logging into SLiMS',
        desc: 'All active students of Politeknik Pariwisata Bali are automatically registered as library members.',
        steps: [
          {
            label: 'Portal Address',
            value: 'Open your browser and visit the official SLiMS Library website at https://library.ppb.ac.id'
          },
          {
            label: 'Login Credentials',
            value: 'Select the "Member Area" option. Enter your Student ID (NIM) as the username, and use your default student portal password (or contact a librarian if it has not been activated yet).'
          },
          {
            label: 'Change Password',
            value: 'For security reasons, immediately change your default password in the profile menu after your first successful login.'
          }
        ]
      },
      {
        id: 'pencarian-opac',
        title: '2. Online Catalogue Search (OPAC)',
        desc: 'OPAC (Online Public Access Catalog) allows you to search for physical and digital book collections online.',
        steps: [
          {
            label: 'Search Field',
            value: 'Enter keywords such as book title, author name, or course subject in the search field on the SLiMS home page.'
          },
          {
            label: 'Search Filters',
            value: 'Use the "Advanced Search" feature to narrow down results by publication year, collection type (book, journal, e-book), or language.'
          },
          {
            label: 'Availability Status',
            value: 'Pay attention to the availability labels: "Available" means ready to borrow from the shelf, "On Loan" means borrowed, or "Reference Only" means read-in-library only.'
          }
        ]
      },
      {
        id: 'peminjaman-durasi',
        title: '3. Borrowing Rules & Fines',
        desc: 'Please comply with the following library circulation policies for the convenience of the entire academic community:',
        steps: [
          {
            label: 'Maximum Quota',
            value: 'Each student is entitled to borrow a maximum of 3 books at the same time.'
          },
          {
            label: 'Borrowing Duration',
            value: 'Books can be borrowed for a maximum of 7 calendar days. You can extend the circulation once (additional 7 days) via the Member Area before the borrowing period expires.'
          },
          {
            label: 'Overdue Fines',
            value: 'Late return of books will incur an administrative fine of IDR 1,000 per day for each book.'
          }
        ]
      },
      {
        id: 'bebas-pustaka',
        title: '4. Library Clearance Service',
        desc: 'A Library Clearance Letter is a mandatory requirement for final-year students to conduct thesis defense or graduate yudisium.',
        steps: [
          {
            label: 'Key Terms',
            value: 'Students must not have any active, unreturned book loans or any administrative outstanding fines in the SLiMS system.'
          },
          {
            label: 'Thesis Submission',
            value: 'Must submit a physically approved copy (hardcopy) of the final thesis/project and upload the digital format (PDF) to the institutional repository system.'
          },
          {
            label: 'Letter Issuance',
            value: 'Application for the library clearance letter can be processed directly at the library circulation desk or digitally via the Member Area circulation menu.'
          }
        ]
      }
    ]
  }
}

export default async function GuidePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams
  const lang = (resolvedParams.lang === 'en' ? 'en' : 'id') as 'id' | 'en'
  const current = t[lang]

  return (
    <main className="bg-gray-50/60 min-h-screen pb-16">
      {/* Hero Section */}
      <section
        className="relative py-20 text-white overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1E5BA8 0%, #030c1c 100%)',
        }}
      >
        {/* Decorative background vectors */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div
            className="absolute -top-12 -right-12 w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href={`/?lang=${lang}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/10 text-xs font-bold rounded-xl transition-all mb-8 shadow-sm"
          >
            {current.backBtn}
          </Link>
          <br />
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border"
            style={{
              background: 'rgba(212,175,55,0.15)',
              color: '#D4AF37',
              borderColor: 'rgba(212,175,55,0.3)',
            }}
          >
            {current.badge}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
            {current.heroTitle}
          </h1>
          <p
            className="text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(219,234,254,0.85)' }}
          >
            {current.heroSub}
          </p>
        </div>
      </section>

      {/* Guide Content Sections */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {current.sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white border border-gray-200/80 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 scroll-mt-24"
              >
                <h2 className="text-2xl font-extrabold tracking-tight mb-3" style={{ color: '#1E5BA8' }}>
                  {section.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 border-l-3 border-accent-400 pl-4">
                  {section.desc}
                </p>

                <div className="space-y-4">
                  {section.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-gray-50 border border-gray-150 flex flex-col md:flex-row md:items-start gap-3"
                    >
                      <span className="font-extrabold text-xs uppercase tracking-wider text-accent-600 md:w-40 shrink-0 mt-0.5">
                        {step.label}
                      </span>
                      <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                        {step.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div
            className="mt-16 text-center text-white rounded-3xl p-8 md:p-12 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #1E5BA8, #05152b)' }}
          >
            <h3 className="text-2xl font-extrabold tracking-tight mb-3">
              {current.ctaHeader}
            </h3>
            <p className="text-sm max-w-lg mx-auto mb-8" style={{ color: 'rgba(219,234,254,0.85)' }}>
              {current.ctaSub}
            </p>
            <Link
              href={`/kontak?lang=${lang}`}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-xl shadow transition-transform hover:scale-105 text-sm"
            >
              {current.ctaBtn}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
