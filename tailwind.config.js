/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'firebase-yellow': '#FFCA28',
        'firebase-yellow-hover': '#FFC107',
        'authjs-blue': '#4285F4',
        'authjs-blue-hover': '#3367D6',
        'logout-red': '#f44336',
        'logout-red-hover': '#d32f2f',
      },
    },
  },
  plugins: [],
}