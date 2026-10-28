/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#060a07',
          900: '#0c130e',
          850: '#111b14',
          800: '#17241b',
          700: '#213327',
          600: '#2f4937',
          500: '#3e6049'
        },
        olive: {
          950: '#0e120d',
          900: '#181f17',
          800: '#253023',
          700: '#374734',
          600: '#4c6148',
          500: '#647e5e',
          400: '#849f7e',
          300: '#a7bfa2'
        },
        gold: {
          300: '#edd08f',
          400: '#dfb86c',
          500: '#cba358',
          600: '#b18940',
          700: '#8f6c2f'
        },
        earth: {
          900: '#141210',
          800: '#221e1a',
          700: '#332e27',
          600: '#4a433a',
          100: '#f4f1ea',
          200: '#e5e2db',
          300: '#cfcac0',
          400: '#a39e94'
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'topo-pattern': "radial-gradient(circle at 50% 50%, rgba(203, 163, 88, 0.05) 0%, transparent 60%)",
        'vignette': "radial-gradient(ellipse at center, transparent 40%, rgba(6, 10, 7, 0.85) 100%)"
      }
    },
  },
  plugins: [],
}
