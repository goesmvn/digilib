'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-bold text-red-500 mb-2">Terjadi Masalah</h2>
      <p className="text-gray-600 text-sm mb-4">Gagal memuat komponen ini.</p>
      <button
        onClick={() => reset()}
        aria-label="Coba muat ulang komponen"
        className="px-4 py-2 bg-primary-900 text-white rounded-lg text-sm font-semibold hover:bg-primary-800 transition-all"
      >
        Coba Lagi
      </button>
    </div>
  )
}
