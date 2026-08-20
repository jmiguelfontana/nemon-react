/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        electric: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          900: '#0c4a6e',
          950: '#082f49',
        },
        energy: {
          amber: '#fbbf24',
          cyan: '#22d3ee',
          emerald: '#34d399',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'electric-glow': '0 0 25px -5px rgba(14, 165, 233, 0.4), 0 0 10px -5px rgba(34, 211, 238, 0.3)',
        'amber-glow': '0 0 25px -5px rgba(251, 191, 36, 0.4)',
      }
    },
  },
  plugins: [],
}
