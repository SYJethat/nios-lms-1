/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: '#FF9933',
        'gov-green': '#059669',
        navy: '#1E3A8A',
        'blue-900': 'rgb(30 58 138)',
      },
    },
  },
  plugins: [],
}

