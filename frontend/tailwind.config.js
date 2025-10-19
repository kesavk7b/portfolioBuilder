/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none", /* IE/Edge */
          "scrollbar-width": "none",    /* Firefox */
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none", /* Chrome, Safari */
        },
      });
    }),
  ],
}

