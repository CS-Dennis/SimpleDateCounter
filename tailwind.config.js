/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        matrix_dark: "#262d1e",
        matrix_dark_green: "#345530",
        matrix_green: "#3b673f",
        matrix_light_green: "#5a8662",
        matrix_blue_green: "#008f11",
        matrix_jade_green: "#00ff41",
      },
      fontFamily: {
        matrix: ["matrix"],
      },
    },
  },
  plugins: [],
};
