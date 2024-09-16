/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-dark': '#050608',
        'donation-card': '#181C14',
        'light-grey': '#F5F5F5',
      },
      boxShadow: {
        '3xl': '0px 0 50px -10px white',
      },
    },
  },
  plugins: [],
};
