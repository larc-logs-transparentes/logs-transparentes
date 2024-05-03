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
      'blue-dark': '#0A697A',
      'yellow': '#FFB500',
      'black': '#030619',
      'white': '#FFFFFF',
      'gray': '#979797',
      'red': '#c01511',
      'light-gray': '#e5e5e5',
      'neon-green': '#00ff00',
      'blue-light-30': 'rgba(0, 198, 212, 0.2)',
      'yellow-30': 'rgba(255, 181, 0, 0.2)',    
      'black-30': 'rgba(3, 6, 25, 0.2)',
      'red-30': 'rgba(192, 21, 17, 0.2)',
      'neon-green-30': 'rgba(0, 255, 0, 0.2)',
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