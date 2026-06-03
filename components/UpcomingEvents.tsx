import { getLibraryEvents } from '@/lib/slims'
import { translations } from '@/lib/i18n'

export default async function UpcomingEvents({ lang }: { lang: 'id' | 'en' }) {
  const events = await getLibraryEvents(3)
  const ev = translations[lang].events

  return (
    <section className="py-16 md:py-24 bg-gray-50/50 border-t border-gray-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-accent-600 font-bold tracking-wider text-xs uppercase mb-2 block">
              {ev.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-900 tracking-tight">
              {ev.title}
            </h2>
            <div className="h-1 w-20 bg-accent-500 mt-4 rounded-full"></div>
          </div>
          <p className="text-gray-600 mt-4 md:mt-0 max-w-md text-base leading-relaxed">
            {ev.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {events.map((event) => {
            const eventDate = new Date(event.date)
            const isValidDate = !isNaN(eventDate.getTime())
            const day = isValidDate ? eventDate.getDate() : '--'
            const month = isValidDate ? eventDate.toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', { month: 'short' }) : '---'
            const fullDateStr = isValidDate
              ? eventDate.toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : event.date

            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Elegant Date Badge Column */}
                  <div className="flex flex-row md:flex-col items-center justify-center bg-primary-50 border border-primary-100/70 text-primary-700 p-3.5 rounded-2xl w-full md:w-20 md:h-20 shrink-0 gap-3 md:gap-0 shadow-sm">
                    <span className="text-3xl font-extrabold tracking-tight leading-none">
                      {day}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest mt-1 text-accent-700">
                      {month}
                    </span>
                  </div>

                  {/* Elegant Event Cover Image (if available) */}
                  {event.image && (
                    <div className="w-full md:w-36 h-32 md:h-24 overflow-hidden rounded-2xl relative shrink-0 border border-gray-200 shadow-inner bg-primary-950">
                      <img
                        src={
                          event.image.startsWith('http')
                            ? `/api/news-image?url=${encodeURIComponent(event.image)}`
                            : event.image
                        }
                        alt={event.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Event Information */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
                      {/* Full Date & Time info with SVG clock */}
                      <span className="text-xs font-semibold text-accent-700 bg-accent-50/60 px-2.5 py-1 border border-accent-100 rounded-md">
                        {fullDateStr}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                        <svg
                          className="w-3.5 h-3.5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{event.time} WITA</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors leading-snug">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed max-w-4xl">
                      {event.description}
                    </p>

                    {event.location && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 pt-1">
                        <svg
                          className="w-4 h-4 text-primary-500 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Register Button */}
                  <div className="w-full md:w-auto shrink-0 md:self-center">
                    <button className="w-full md:w-auto px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl shadow-sm hover:shadow transition-all duration-200 text-sm whitespace-nowrap">
                      {ev.registerBtn}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {events.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200/65">
            <svg
              className="w-12 h-12 text-gray-300 mx-auto mb-4"
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
            <p className="text-gray-500 font-medium text-base">
              {ev.noEvents}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
