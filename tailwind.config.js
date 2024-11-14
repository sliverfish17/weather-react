/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        heading: '#121212',
        gray: {
          100: '#1C242B',
          90: '#35424F',
          80: '#56626F',
          70: '#8E9AA7',
          50: '#DEE2E6',
          30: '#F2F6FF',
          0: '#FFFFFF',
        },
        sunny: '#FFBCA5',
      },
      backgroundImage: {
        thunder: 'linear-gradient(180deg, #BCE8FF 0%, #FFFFFF 41.26%)',
        sunny: 'linear-gradient(180deg, #2F5AF4 0%, #0FA2AB 100%)',
      },
    },
  },
  plugins: [],
};
