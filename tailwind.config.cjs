/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        gh: {
          "gray-border": "rgba(27, 31, 35, 0.06)",
          "green-1": "#0e4429",
          "green-2": "#006d32",
          "green-3": "#26a641",
          "green-4": "#39d353",
          black: "#1c2128",
          white: "#cdd9e5",
          "gray-0": "#cdd9e5",
          "gray-1": "#adbac7",
          "gray-2": "#909dab",
          "gray-3": "#768390",
          "gray-4": "#636e7b",
          "gray-5": "#545d68",
          "gray-6": "#444c56",
          "gray-7": "#373e47",
          "gray-8": "#2d333b",
          "gray-9": "#22272e"
        }
      }
    }
  },

  plugins: []
};

module.exports = config;
