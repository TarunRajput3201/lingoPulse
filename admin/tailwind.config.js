/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#58CC02',
          greenDark: '#46A302',
          blue: '#1CB0F6',
          blueDark: '#1899D6',
          gold: '#FFC800',
          red: '#FF4B4B',
          charcoal: '#3C3C3C',
        }
      }
    },
  },
  plugins: [],
}
