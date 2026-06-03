import { getLatestNews } from '@/lib/ppb'
import Link from 'next/link'
import { translations } from '@/lib/i18n'

export default async function LatestNews({ lang }: { lang: 'id' | 'en' }) {
  const news = await getLatestNews(3)
  const n = translations[lang].news

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-accent-600 font-bold tracking-wider text-xs uppercase mb-2 block">
              {n.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-900 tracking-tight">
              {n.title}
            </h2>
            <div className="h-1 w-20 bg-accent-500 mt-4 rounded-full"></div>
          </div>
          <p className="text-gray-600 mt-4 md:mt-0 max-w-md text-base leading-relaxed">
            {n.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="h-56 bg-primary-950 overflow-hidden relative shrink-0">
                {item.image ? (
                  <img
                    src={
                      item.image.startsWith('http')
                        ? `/api/news-image?url=${encodeURIComponent(item.image)}`
                        : item.image
                    }
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center">
                    <img
                      src="/logo-ppb.png"
                      alt="PPB Logo"
                      className="w-20 h-20 opacity-30 object-contain"
                    />
                  </div>
                )}
                {/* Category Badge overlay */}
                {item.category && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-primary-900/90 backdrop-blur-sm text-white border border-primary-700/50 rounded-lg text-xs font-semibold uppercase tracking-wider shadow-sm">
                    {item.category}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                {/* Footer Section */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500">
                    <svg
                      className="w-4 h-4 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-xs font-semibold">
                      {(() => {
                        const d = new Date(item.date)
                        return !isNaN(d.getTime())
                          ? d.toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : item.date
                      })()}
                    </span>
                  </div>

                  <span className="text-primary-600 font-bold text-sm inline-flex items-center gap-1 group-hover:text-primary-700 transition-colors">
                    {n.readBtn}
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href={lang === 'en' ? 'https://ppb.ac.id/en/' : 'https://ppb.ac.id/berita'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm group"
          >
            {n.moreBtn}
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
