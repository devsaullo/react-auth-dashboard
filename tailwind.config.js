module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        blueOcean: '#00182c',
        semiBlack: '#1E293B'
      },
      width: {
        '4.5': '17px',
      },
      height: {
        '4.5': '17px',
      },
      variants: {
        extend: {
        },
      },
      plugins: [
        function ({ addUtilities }) {
          addUtilities({
            '.no-def-pass-visi': {
              '&::-ms-reveal': { display: 'none' },
              '&::-ms-clear': { display: 'none' },
              '&::-webkit-clear-button': { display: 'none' },
              '&::-webkit-inner-spin-button': { display: 'none' },
              '&::-webkit-outer-spin-button': { display: 'none' },
              '&::-webkit-reveal': { display: 'none' },
              '&::-moz-clear-button': { display: 'none' },
              '&::-moz-inner-spin-button': { display: 'none' },
              '&::-moz-outer-spin-button': { display: 'none' },
              '&::-moz-reveal': { display: 'none' },
            },
          })
        },
      ],
    }
  }
}