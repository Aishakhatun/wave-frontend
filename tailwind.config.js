/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        'pearl': {
          DEFAULT: '#FDFCFB',
          dark: '#F5F2F0',
        },
        'sage': {
          light: '#E8F3F1',
          DEFAULT: '#A8D1CB',
          dark: '#7AA7A1',
        },
        'teal-glow': {
          DEFAULT: '#2DD4BF',
          soft: '#99F6E4',
        },
        sky: {
          DEFAULT: '#5bc8e8',
          light: '#a8e4f5',
          pale: '#d6f3fb',
        },
        ocean: {
          DEFAULT: '#1a8fb5',
          deep: '#0d6a8a',
        },
        coral: {
          DEFAULT: '#f5a05a',
          light: '#ffd4a8',
        },
        sand: {
          DEFAULT: '#fef5e7',
          dark: '#f9ead2',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'wave-flow': 'waveFlow 20s linear infinite',
        'float': 'floatUp 6s ease-in-out infinite',
        'float-slow': 'floatUp 8s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
      },
      keyframes: {
        waveFlow: {
          '0%': { transform: 'translateX(0) scaleY(1)' },
          '50%': { transform: 'translateX(-25%) scaleY(1.05)' },
          '100%': { transform: 'translateX(-50%) scaleY(1)' },
        },
        floatUp: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.02)' },
        }
      },
      backgroundImage: {
        'gradient-ocean': 'linear-gradient(135deg, #5bc8e8 0%, #1a8fb5 50%, #0d6a8a 100%)',
        'gradient-glow': 'linear-gradient(135deg, #a8e4f5 0%, #5bc8e8 50%, #f5a05a 100%)',
        'gradient-premium': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        'gradient-spa': 'linear-gradient(135deg, #E8F3F1 0%, #FDFCFB 100%)',
      }
    },
  },
  plugins: [],
}

