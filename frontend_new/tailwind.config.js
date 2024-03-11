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
      'red': '#c01511',
      'light-gray': '#e5e5e5',
      'neon-green': '#00ff00',

    },  
      screens: {
      'xs': '321px',
      'sm': '640px',
      'md': '768px',
      'md2': '884px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
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