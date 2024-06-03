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
      plugins: [],
    }
  }
}