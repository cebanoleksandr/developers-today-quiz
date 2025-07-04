/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {},
      boxShadow: {
        soft: '0 4px 4px rgba(72, 79, 93, 0.06)',
        combined: '0px 4px 6px -4px rgba(72, 79, 93, 0.06), 0 0 2px 0 rgba(72, 79, 93, 0.25)',
      },
      keyframes: {
        'popup-open': {
          '0%': { position: 'relative', bottom: '-100%', transform: 'scale(1)' },
          '20%': { position: 'relative', bottom: '-40%', transform: 'scale(1.1)' },
          '40%': { position: 'relative', bottom: '-30%', transform: 'scale(1.15)' },
          '60%': { position: 'relative', bottom: '-20%', transform: 'scale(1.15)' },
          '80%': { position: 'relative', bottom: '-10%', transform: 'scale(1.1)' },
          '100%': { position: 'relative', bottom: '0', transform: 'scale(1)' },
        },
        'appear': {
          '0%': { display: 'none', opacity: '0' },
          '20%': { opacity: '.2' },
          '40%': { opacity: '.4' },
          '60%': { opacity: '.6' },
          '80%': { opacity: '.8' },
          '100%': {},
        },
      },
      animation: {
        'popup-open': 'popup-open .25s ease-in-out forwards',
        'popup-close': 'popup-open .25s ease-in-out forwards reverse',
        
        'appear': 'appear .25s ease-in-out forwards',
        'disappear': 'appear .25s ease-in-out forwards reverse',
      }
    },
  },
  plugins: [],
}
