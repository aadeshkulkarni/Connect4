const colors = require("tailwindcss/colors")

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        noto: ['"Noto Sans JP"', '"sans serif'],
      },
      colors: {
        cyan: colors.cyan,
        teal: colors.teal,
        rose: colors.rose,
        pink: colors.pink,
        blueGray: colors.blueGray,
      },
      width: {
        40: "50px",
        240: "330px",
      },
      height: {
        40: "50px",
        280: "385px",
      },
      keyframes: {
        "coin-bounce": {
          "0%, 100%": {
            transform: "-translate-y-2/4",
          },
          "50%": {
            transform: "translate-y-0",
          },
        },
      },
      animation: {
        "coin-bounce": "bounce 0.5s ease-in",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
