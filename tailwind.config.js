/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter-regular': ['var(--inter-regular)'],
        'inter-bold': ['var(--inter-bold)'],
        'inter-semi-bold': ['var(--inter-semi-bold)'],
      },
      colors : {
        'primary' : '#007FE6',
        'black' : '#333333',
        'dark-grey' : '#7D7C84'
      },
      fontSize : {
        'sub-heading' : '36px',
        'title' : '20px',
        'description' : '14px',
        'caption' : '12px',
      },
      boxShadow : {
        'card' : '0px 0px 8px rgba(45, 41, 41, 0.08);'
      },
    },
  },
  plugins: [],
}
