/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    // screens: {
    //   sm: '480px',
    //   md: '768px',
    //   lg: '976px',
    //   xl: '1440px',
    // },


    extend: {
      colors: {
        primary: "#0096c7",
        secondary: "#f4f0f5",
        violet: "#9800ff",
        qgreen: "#AFC8AD",
        beige: "#EEE7DA",
        qgray: "#F6F5F2"

      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
    plugins: [],
  }

}