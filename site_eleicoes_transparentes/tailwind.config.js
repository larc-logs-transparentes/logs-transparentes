/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        default: {
          orange: {
            400: "#ffb500",
          },
          cyan: {
            300: "#00c6d4",
            400: "#1094ab",
            700: '#0a697a',
          },
          gray: {
            600: '#7d7d7d'
          }
        },
      },
    },
  },
  plugins: [],
};
