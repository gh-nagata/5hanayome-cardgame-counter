/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    // wide: 横長 tall:縦長
    function ({ addVariant }) {
      addVariant("wide", "@media (min-aspect-ratio: 1/1)");
      addVariant("tall", "@media (max-aspect-ratio: 1/1)");
    },
  ],
};
