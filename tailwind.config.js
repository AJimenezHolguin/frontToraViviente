import {heroui} from "@heroui/theme";
const {COLORSTEXT} =require("./shared/styles/colors")


/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: COLORSTEXT.primary,
        secondary: COLORSTEXT.secondary, 
        grey_ligth:COLORSTEXT.grey_ligth,
        grey_dark: COLORSTEXT.grey_dark,
        default: COLORSTEXT.default,
        danger: COLORSTEXT.danger,
      },
    },
  },

  plugins: [heroui()],
}

module.exports = config;