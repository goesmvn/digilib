// Centralized translations for multi-language (i18n) support

export const translations = {
  id: {
    hero: {
      title: 'Perpustakaan Digital',
      subtitle: 'Politeknik Pariwisata Bali',
      btnOPAC: 'Koleksi SLiMS',
      btnRepo: 'Repository Karya Ilmiah',
      scrollDown: 'Scroll kebawah',
      slides: [
        {
          label: 'Koleksi Ribuan Buku',
          caption: 'Temukan buku akademik, jurnal ilmiah, dan referensi pariwisata terlengkap',
        },
        {
          label: 'Kekayaan Budaya Bali',
          caption: 'Dukung penelitian seni, budaya, dan pariwisata Nusantara',
        },
        {
          label: 'Kampus PPB Nusa Dua',
          caption: 'Lingkungan belajar modern di jantung destinasi wisata dunia',
        },
      ]
    },
    statistics: {
      badge: 'Data Terkini SLiMS',
      title: 'Statistik Perpustakaan',
      subtitle: 'Informasi koleksi dan keanggotaan terintegrasi secara otomatis dari pangkalan data sistem manajemen perpustakaan.',
      cards: {
        books: 'Koleksi Buku',
        members: 'Anggota Terdaftar',
        categories: 'Kategori Koleksi',
        loans: 'Peminjaman Aktif'
      }
    },
    news: {
      badge: 'Pembaruan Terkini',
      title: 'Berita & Pengumuman',
      subtitle: 'Ikuti berita terhangat, pencapaian akademik, dan pengumuman resmi dari seluruh komunitas Politeknik Pariwisata Bali.',
      readBtn: 'Baca',
      moreBtn: 'Buka Berita Selengkapnya',
      fallbackCategory: 'Berita'
    },
    events: {
      badge: 'Kalender Kegiatan',
      title: 'Agenda & Acara Terdekat',
      subtitle: 'Jangan lewatkan workshop literasi, seminar hospitality, dan kegiatan edukatif perpustakaan mendatang.',
      location: 'Lokasi:',
      time: 'Waktu:',
      registerBtn: 'Daftar Kegiatan',
      noEvents: 'Tidak ada agenda kegiatan terdekat saat ini.',
      moreBtn: 'Buka Agenda Selengkapnya'
    },
    quickLinks: {
      badge: 'Akses Layanan',
      title: 'Layanan Digital Utama',
      subtitle: 'Nikmati akses cepat dan terintegrasi ke seluruh ekosistem digital Perpustakaan Politeknik Pariwisata Bali.',
      services: [
        {
          title: 'Koleksi Buku Digital',
          description: 'Akses ribuan koleksi buku digital, jurnal, dan e-resources untuk mendukung pembelajaran Anda.',
          buttonText: 'Kunjungi Koleksi',
        },
        {
          title: 'Repository Penelitian',
          description: 'Jelajahi repository penelitian dan karya ilmiah mahasiswa serta dosen melalui sistem SLIMS terintegrasi.',
          buttonText: 'Lihat Repository',
        },
        {
          title: 'E-Journal & Publikasi',
          description: 'Baca jurnal elektronik, publikasi penelitian, dan karya ilmiah dari komunitas akademik PPB.',
          buttonText: 'Baca Jurnal',
        },
      ],
      guideTitle: 'Panduan Akses Layanan Perpustakaan',
      steps: [
        {
          num: '01',
          title: 'Daftar Anggota',
          desc: 'Kunjungi counter perpustakaan atau daftar online untuk mendapatkan akun akses anggota.',
        },
        {
          num: '02',
          title: 'Explore Koleksi',
          desc: 'Gunakan fitur pencarian terintegrasi untuk menemukan buku, jurnal, dan referensi yang Anda butuhkan.',
        },
        {
          num: '03',
          title: 'Akses & Unduh',
          desc: 'Unduh file PDF secara instan, baca secara online, atau ajukan peminjaman buku fisik dengan mudah.',
        },
        {
          num: '04',
          title: 'Kontribusi Riset',
          desc: 'Bagikan hasil penelitian, tesis, atau jurnal ilmiah Anda di repositori untuk publikasi institusi.',
        },
      ]
    },
    footer: {
      desc: 'Platform digital perpustakaan terpadu dengan sistem SLiMS, menyediakan akses cepat ke koleksi buku digital, repository karya ilmiah, dan jurnal internasional.',
      layananHeader: 'Layanan Utama',
      layananLinks: [
        { label: 'Koleksi Buku SLiMS', href: 'https://library.ppb.ac.id' },
        { label: 'Repository Penelitian', href: 'https://repo.ppb.ac.id' },
        { label: 'E-Journal PPB', href: 'https://ejournal.ppb.ac.id' },
        { label: 'Panduan Penggunaan', href: '/guide' },
      ],
      perpustakaanHeader: 'Perpustakaan',
      perpustakaanLinks: [
        { label: 'Tentang Kami', href: '/tentang' },
        { label: 'Visi & Misi', href: '/tentang#visi-misi' },
        { label: 'Jam Layanan', href: '/tentang#jam-layanan' },
        { label: 'Hubungi Kami', href: '/kontak' },
        { label: 'Panel Admin', href: '/admin' },
      ],
      hubungiHeader: 'Hubungi Kami',
      address: 'Jl. Dharmawangsa, Kampial, Nusa Dua, Bali 80363',
      hours: '07:30 - 16:00 WITA',
      socialsHeader: 'Ikuti Media Sosial Kami',
      copyRight: 'Perpustakaan Politeknik Pariwisata Bali. Hak Cipta Dilindungi.',
      websiteResmi: 'Website Resmi PPB',
      syaratKetentuan: 'Syarat & Ketentuan',
      bottomBar: 'Membangun ekosistem digital perpustakaan untuk mendukung pembelajaran dan inovasi akademik di Politeknik Pariwisata Bali.'
    }
  },
  en: {
    hero: {
      title: 'Digital Library',
      subtitle: 'Politeknik Pariwisata Bali',
      btnOPAC: 'SLiMS Collection',
      btnRepo: 'Research Repository',
      scrollDown: 'Scroll down',
      slides: [
        {
          label: 'Thousands of Books Collection',
          caption: 'Find the most complete academic books, scientific journals, and tourism references',
        },
        {
          label: 'Rich Balinese Culture',
          caption: 'Support research in arts, culture, and hospitality of the Indonesian archipelago',
        },
        {
          label: 'PPB Nusa Dua Campus',
          caption: 'Modern learning environment in the heart of the world\'s leading tourist destination',
        },
      ]
    },
    statistics: {
      badge: 'SLiMS Live Data',
      title: 'Library Statistics',
      subtitle: 'Collection and membership information is automatically integrated from the library management system database.',
      cards: {
        books: 'Books Collection',
        members: 'Registered Members',
        categories: 'Collection Categories',
        loans: 'Active Loans'
      }
    },
    news: {
      badge: 'Latest Updates',
      title: 'News & Announcements',
      subtitle: 'Follow the hottest news, academic achievements, and official announcements from the Politeknik Pariwisata Bali community.',
      readBtn: 'Read',
      moreBtn: 'Read More News',
      fallbackCategory: 'News'
    },
    events: {
      badge: 'Events Calendar',
      title: 'Upcoming Agendas & Events',
      subtitle: 'Don\'t miss our upcoming literacy workshops, hospitality seminars, and educational library events.',
      location: 'Location:',
      time: 'Time:',
      registerBtn: 'Register Event',
      noEvents: 'No upcoming library events at the moment.',
      moreBtn: 'View More Events'
    },
    quickLinks: {
      badge: 'Service Access',
      title: 'Core Digital Services',
      subtitle: 'Enjoy fast and integrated access to the entire digital ecosystem of Perpustakaan Politeknik Pariwisata Bali.',
      services: [
        {
          title: 'Digital Book Collection',
          description: 'Access thousands of digital book collections, journals, and e-resources to support your learning.',
          buttonText: 'Visit Collection',
        },
        {
          title: 'Research Repository',
          description: 'Explore research repositories and scientific works of students and lecturers through our integrated SLiMS system.',
          buttonText: 'View Repository',
        },
        {
          title: 'E-Journal & Publications',
          description: 'Read electronic journals, research publications, and scientific papers from the PPB academic community.',
          buttonText: 'Read Journals',
        },
      ],
      guideTitle: 'Library Service Access Guide',
      steps: [
        {
          num: '01',
          title: 'Member Registration',
          desc: 'Visit the library service counter or register online to get your membership access credentials.',
        },
        {
          num: '02',
          title: 'Explore Collections',
          desc: 'Use the integrated online search catalog to find specific books, journals, and references.',
        },
        {
          num: '03',
          title: 'Access & Download',
          desc: 'Download PDFs instantly, read online, or submit a request for physical book borrowing easily.',
        },
        {
          num: '04',
          title: 'Research Contribution',
          desc: 'Contribute and upload your research papers, final thesis, or scientific journals to the repository.',
        },
      ]
    },
    footer: {
      desc: 'An integrated digital library platform powered by SLiMS, providing fast access to digital book collections, scientific research repositories, and international journals.',
      layananHeader: 'Core Services',
      layananLinks: [
        { label: 'SLiMS Book Collection', href: 'https://library.ppb.ac.id' },
        { label: 'Research Repository', href: 'https://repo.ppb.ac.id' },
        { label: 'E-Journal PPB', href: 'https://ejournal.ppb.ac.id' },
        { label: 'User Usage Guide', href: '/guide' },
      ],
      perpustakaanHeader: 'Library Profile',
      perpustakaanLinks: [
        { label: 'About Us', href: '/tentang' },
        { label: 'Vision & Mission', href: '/tentang#visi-misi' },
        { label: 'Operational Hours', href: '/tentang#jam-layanan' },
        { label: 'Contact Us', href: '/kontak' },
        { label: 'Admin Panel', href: '/admin' },
      ],
      hubungiHeader: 'Contact Info',
      address: 'Jl. Dharmawangsa, Kampial, Nusa Dua, Bali 80363',
      hours: '07:30 AM - 04:00 PM WITA',
      socialsHeader: 'Follow Our Social Media',
      copyRight: 'Politeknik Pariwisata Bali Library. All Rights Reserved.',
      websiteResmi: 'PPB Official Website',
      syaratKetentuan: 'Terms & Conditions',
      bottomBar: 'Building a library digital ecosystem to support academic learning and innovation at Politeknik Pariwisata Bali.'
    }
  }
}
