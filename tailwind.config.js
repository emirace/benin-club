/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#FBFBFB",
      black: "#131112",
      red: "#D8261E",
      gray: "#979798",
      pink: "#DC7C74",
      green: "#5fdba7 ",
    },
    extend: {
      backgroundImage: {
        footer: "url('/images/image3.jpg')",
      },
    },
  },
  plugins: [],
};
