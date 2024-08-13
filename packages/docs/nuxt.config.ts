// https://nuxt.com/docs/api/configuration/nuxt-config

import { readFileSync } from 'node:fs'

export default defineNuxtConfig({
  extends: [
    './layers/toodles',
    '@thombruce/tnt-content',
  ],
  routeRules: {
    '/windows': { redirect: 'https://github.com/thombruce/toodles/releases/latest' },
    '/vscode': { redirect: 'https://marketplace.visualstudio.com/items?itemName=thombruce.toodles' },
    '/github': { redirect: 'https://github.com/thombruce/toodles' },
  },
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
