/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

export default {
  presets: [
    require('@thombruce/tnt/tailwind.preset'),
  ],
  theme: {
    extend: {
      colors: {
        primary: {...colors.teal, ...{
          DEFAULT: colors.teal['500'],
          hover: colors.teal['600'],
          light: {
            DEFAULT: colors.teal['500'],
            hover: colors.teal['600'],
          },
          dark: {
            DEFAULT: colors.teal['500'],
            hover: colors.teal['400'],
          },
        }},
      },
    },
  },
}
