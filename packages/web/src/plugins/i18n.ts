import { createI18n } from 'vue-i18n'

import * as languages from '@/i18n'

const messages = {
  ...languages
}

const i18n = createI18n({
  locale: navigator.language,
  fallbackLocale: 'en',
  messages,
})

export default i18n
