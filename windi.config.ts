import { defineConfig } from 'windicss/helpers'
// import colors from 'windicss/colors'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  darkMode: 'class',
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: false,

  plugins: [
    typography(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans'],
        display: ['Altone Trial'],
      },
      fontSize: {
        '3xs': '.65rem',
        '4xs': '.60rem',
        '2xs': '.70rem',
      },
    },
  },
})
