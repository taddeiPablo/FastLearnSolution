const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
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