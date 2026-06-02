import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // PPB Official Theme - From ppb.ac.id
        primary: {
          50: '#f0f5ff',
          100: '#d9e9ff',
          200: '#b3d3ff',
          300: '#8cbdff',
          400: '#6fa7ff',
          500: '#1E5BA8', // PPB Hero Blue
          600: '#1a4f91',
          700: '#154378',
          800: '#0f355f',
          900: '#0a2846',
          950: '#05182b',
        },
        accent: {
          50: '#fffaf0',
          100: '#fef3e2',
          200: '#fde8c5',
          300: '#fcdca8',
          400: '#fbd18b',
          500: '#D4AF37', // PPB Gold (PARIWISATA accent)
          600: '#b8942f',
          700: '#9c7927',
          800: '#80641f',
          900: '#644f17',
        },
        secondary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#B8432C', // PPB Dark Red
          600: '#9e3820',
          700: '#842c1b',
          800: '#6a2016',
          900: '#521812',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          500: '#22c55e',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #1E5BA8 0%, #0f355f 50%, #1E5BA8 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(30, 91, 168, 0.05) 0%, rgba(74, 124, 126, 0.05) 100%)',
      },
    },
  },
  plugins: [],
}

export default config
