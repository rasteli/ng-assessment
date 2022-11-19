/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")

module.exports = {
  content: ["./src/**/*.tsx", "index.html"],
  theme: {
    fontSize: {
      xs: "0.875rem",
      sm: "1rem",
      md: "1.125rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "2rem",
      "3xl": "2.25rem"
    },
    colors: {
      transparent: "transparent",
      black: "#000",
      gray: {
        900: "#121214",
        800: "#18181C",
        700: "#202024",
        400: "#7C7C8A",
        200: "#C4C4CC",
        100: "#E1E1E6"
      },
      cyan: {
        500: "#81D8F7",
        300: "#B5E8FA"
      },
      red: {
        400: "#CB2B2B"
      }
    },
    extend: {
      fontFamily: {
        sans: "Inter, sans-serif"
      }
    }
  },
  plugins: [
    plugin(function (helpers) {
      dataStateVariant("checked", helpers)
      dataStateVariant("unchecked", helpers)
      dataStateVariant("on", helpers)
      dataStateVariant("off", helpers)
      dataVariant("placeholder", helpers)
    })
  ]
}

function dataStateVariant(state, { addVariant, e }) {
  addVariant(`data-state-${state}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`data-state-${state}${separator}${className}`)}[data-state='${state}']`
    })
  })
}

function dataVariant(attribute, { addVariant, e }) {
  addVariant(`data-${attribute}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`data-${attribute}${separator}${className}`)}[data-${attribute}]`
    })
  })
}
