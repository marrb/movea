/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "deep-black": "#151922",
        "headline-white": "#C3C3C2",
        "section-gray": "#939285",
        "side-black": "#242526",
      },
      fontSize: {
        tiny: "12px",
      },
      fontFamily: {
        ibarra: "'Ibarra Real Nova', serif",
      },
      flex: {
        "1-auto": "auto auto",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
