import { createI18n } from 'vue-i18n'

import { en } from '@/i18n'

const messages = {
  en
}

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n
