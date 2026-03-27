/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './articles/**/*.html',
    './solutions/**/*.html',
    './industries/**/*.html',
    './knowledge/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          orange: '#ff8000',
          blue:   '#1462ff',
          navy:   '#012f56',
          gray:   '#5e617d',
          light:  '#f8fafc',
        },
      },
    },
  },
  plugins: [],
};
