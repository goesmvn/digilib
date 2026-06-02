import Image from 'next/image'
import { translations } from '@/lib/i18n'

export default function QuickLinks({ lang }: { lang: 'id' | 'en' }) {
  const q = translations[lang].quickLinks

  const services = [
    {
      image: '/service-books.png',
      title: q.services[0].title,
      description: q.services[0].description,
      link: 'https://library.ppb.ac.id',
      buttonText: q.services[0].buttonText,
    },
    {
      image: '/service-research.png',
      title: q.services[1].title,
      description: q.services[1].description,
      link: 'https://repo.ppb.ac.id',
      buttonText: q.services[1].buttonText,
    },
    {
      image: '/service-journal.png',
      title: q.services[2].title,
      description: q.services[2].description,
      link: 'https://ejournal.ppb.ac.id',
      buttonText: q.services[2].buttonText,
    },
  ]

  const steps = [
    {
      num: q.steps[0].num,
      title: q.steps[0].title,
      desc: q.steps[0].desc,
    },
    {
      num: q.steps[1].num,
      title: q.steps[1].title,
      desc: q.steps[1].desc,
    },
    {
      num: q.steps[2].num,
      title: q.steps[2].title,
      desc: q.steps[2].desc,
    },
    {
      num: q.steps[3].num,
      title: q.steps[3].title,
      desc: q.steps[3].desc,
    },
  ]

  return (
    <section id="layanan" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent-600 font-bold tracking-wider text-xs uppercase mb-2 block">
            {q.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-900 tracking-tight">
            {q.title}
          </h2>
          <div className="h-1 w-20 bg-accent-500 mt-4 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-base">
            {q.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200/50"
            >
              {/* Background Image */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-all duration-500 ease-out"
                priority={index === 0}
              />

              {/* Dark Overlay Gradient (highly readable, high contrast) */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-900/80 to-primary-900/20 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50" />

              {/* Content Container */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10">
                <h3 className="text-xl font-bold mb-2 tracking-tight group-hover:text-accent-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-200 leading-relaxed line-clamp-3 mb-6">
                  {service.description}
                </p>

                <div>
                  <span className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-primary-600 text-white text-xs font-bold rounded-xl hover:bg-accent-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
                    {service.buttonText}
                    <svg
                      className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* How to Use Section */}
        <div className="mt-20 bg-gray-50/70 border border-gray-200/80 rounded-3xl p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              {/* SVG Help Icon */}
              <div className="p-2.5 bg-primary-100 rounded-xl">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-primary-900 tracking-tight">
                {q.guideTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm relative group hover:border-accent-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="text-4xl font-black text-accent-500/15 absolute top-4 right-4 group-hover:text-accent-500/25 transition-colors select-none">
                    {step.num}
                  </div>
                  <h4 className="font-extrabold text-primary-900 text-base mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
