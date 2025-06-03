import {heroui} from "@heroui/theme";
import { COLORS } from "./styles/colors";


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
        ...COLORS,
      },
    },
  },

  plugins: [heroui()],
}

module.exports = config;