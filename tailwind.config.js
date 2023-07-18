/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gunmetal: "#273544",
        platinum: "#e6e6e6",
      },
      gridTemplateColumns: {
        modal: "2fr 3fr",
      },
      transitionProperty: {
        commentBox: "background-color, padding",
      },
    },
  },
  plugins: [],
};
