// https://nuxt.com/docs/api/configuration/nuxt-config

import { readFileSync } from 'node:fs'

export default defineNuxtConfig({
  extends: [
    '@thombruce/tnt-content',
  ],
  content: {
    highlight: {
      langs: [
        // Read more about Shiki languages: https://shiki.style/guide/load-lang
        JSON.parse(
          readFileSync('./shiki/languages/toodles.tmLanguage.json', 'utf-8'),
        ),
        JSON.parse(
          readFileSync('./shiki/languages/todotxt.tmLanguage.json', 'utf-8'),
        ),
      ],
    },
  },
})
