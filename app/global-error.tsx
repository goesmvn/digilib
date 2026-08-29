'use client'

import { useEffect } from 'react'

export default function GlobalError({
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
    <html>
      <body className="bg-gray-900 text-white flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Terjadi Kesalahan Aplikasi</h2>
        <p className="text-gray-300 text-sm mb-6 max-w-md">
          Aplikasi mengalami kesalahan tak terduga. Silakan coba muat ulang halaman.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold rounded-lg text-sm transition-all"
        >
          Coba Lagi
        </button>
      </body>
    </html>
  )
}
