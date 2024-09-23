/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '576px',
      // => @media (min-width: 576px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '992px',
      // => @media (min-width: 992px) { ... }

      xl: '1200px',
      // => @media (min-width: 1200px) { ... }

      '2xl': '1400px',
      // => @media (min-width: 1400px) { ... }

      '3xl': '1600px'
      // => @media (min-width: 1600px) { ... }
    },
    extend: {
      fontFamily: {
        SansTC: ['Noto Sans TC'],
        SerifTC: ['Noto Serif TC'],
        Metrophobic: ['Metrophobic']
      },
      backgroundImage: {
        banner: "url('@/assets/homepage/header/banner.png')",
        flagbg: "url('@/assets/homepage/header/flagbg.svg')",
        mainbg: "url('@/assets/homepage/main/mainbg.png')",
        aboutbg: "url('@/assets/homepage/main/aboutbg.png')",
        road: "url('@/assets/homepage/main/road.svg')",
        infobg: "url('@/assets/businfo/infobg.svg')",
        leaf: "url('@/assets/businfo/leaf.svg')",
        city01: "url('@/assets/main/city01.svg')",
        city02: "url('@/assets/main/city02.svg')"
      },
      boxShadow: {
        nav: '0 5px 12px 0 rgba(0,0,0,0.25)'
      },
      keyframes: {
        marqueeCity1: {
          '0%': {
            transform: 'translateX(0)'
          },
          '100%': {
            transform: 'translateX(-50%)'
          }
        },
        marqueeCity2: {
          '0%': {
            transform: 'translateX(-50%)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        }
      },
      animation: {
        marqueeCity1: 'marqueeCity1 20s linear infinite',
        marqueeCity2: 'marqueeCity2 20s linear infinite'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      'valentine',
      'halloween',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter'
    ]
  }
}
