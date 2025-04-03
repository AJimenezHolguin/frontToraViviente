import {heroui} from "@heroui/theme";
const {COLORS} =require("./shared/styles/colors")


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
        primary: COLORS.primary,
        secondary: COLORS.secondary, 
        grey_ligth:COLORS.grey_ligth,
        grey_dark: COLORS.grey_dark,
        default: COLORS.default
      },
    },
  },

  plugins: [heroui()],
}

module.exports = config;