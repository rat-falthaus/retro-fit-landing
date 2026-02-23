/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Rex AutomatierungsTechnik brand palette
        'rex-orange':      '#EB6734',
        'rex-orange-dark': '#C64A32',
        'rex-orange-deep': '#A84721',
        'rex-dark':        '#313131',
        'rex-dark-soft':   '#3c3c3c',
        'rex-warm':        '#f0ece8',
        'rex-warm-mid':    '#c8baad',
        'rex-slate':       '#586569',
        // Legacy aliases kept for backward-compat with existing class usage
        'forest-green':      '#313131',
        'industrial-amber':  '#EB6734',
        'tech-slate':        '#313131',
      },
      fontFamily: {
        'sans':    ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Roboto Condensed', 'sans-serif'],
      },
      borderRadius: {
        'xl':  '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
