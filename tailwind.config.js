/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from Implementation Blueprint
        'forest-green': '#2D5A27',
        'industrial-amber': '#F59E0B',
        'tech-slate': '#1E293B',
        'deep-green': '#2D5A27', // Alias for primary
        'industrial-orange': '#F59E0B', // Alias for accent
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Roboto Condensed', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
