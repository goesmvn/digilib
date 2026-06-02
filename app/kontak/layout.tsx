import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontak | Perpustakaan Politeknik Pariwisata Bali',
  description:
    'Hubungi Perpustakaan Politeknik Pariwisata Bali — informasi kontak, jam layanan, lokasi, dan form pesan online.',
}

export default function KontakLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
