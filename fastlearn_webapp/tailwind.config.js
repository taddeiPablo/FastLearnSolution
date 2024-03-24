// aqui declaramos esta constante para poder configurar tambien nuestros recursos personalizados
const defaultTheme = require('tailwindcss/defaultTheme');

// aqui definicion del objecto de configuracion de tailwind
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      lato: ['Lato', 'sans-serif']
    },
    colors: {
      "special-gray": '#F5F0F0',
      ...defaultTheme.colors
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'hover', 'focus']
    },
  },
  plugins: [],
}
