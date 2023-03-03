/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkred: '#92140C',
        floralwhite: '#FFF8F0',
        myblack: '#090909',
        aeroblue: '#D3FFE9',
        blood: '#69140E',
        mymagenta: '#8F2D56'
      },
      fontFamily: {
        body: ['Nunito'],
        nav: ['Exo']
      }
    },
  },
  plugins: [],
}
