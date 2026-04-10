/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#FDFBF7',
          'bg-secondary': '#F4EFE6',
          'bg-accent': '#E8D5D1'
        },
        text: {
          primary: '#2D2A26',
          secondary: '#5C574F',
          inverse: '#FFFFFF'
        },
        brand: {
          primary: '#C5A059',
          'primary-hover': '#B38F4E',
          accent: '#D1A3A4'
        },
        border: {
          subtle: 'rgba(45, 42, 38, 0.08)',
          medium: 'rgba(45, 42, 38, 0.15)'
        }
      },
      fontFamily: {
        heading: ["'Playfair Display'", 'serif'],
        body: ["'Outfit'", 'sans-serif']
      }
    },
  },
  plugins: [],
}
