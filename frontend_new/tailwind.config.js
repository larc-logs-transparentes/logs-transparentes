/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '50%': '50%',
      '16': '4rem',
    },
    colors: {
      'blue': '#1094AB',
      'blue-light': '#00C6D4',
      'yellow': '#FFB500',
      'black': '#030619',
      'white': '#FFFFFF',
      'gray': '#979797',

    },
    backgroundPosition: {
      bottom: 'bottom',
      bottomcenter: 'center bottom -2rem',
      center: 'center',
    },
    extend: {
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(5px)',
      },
      
    },
  },
  plugins: [],
}