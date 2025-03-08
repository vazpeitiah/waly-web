import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
//import LanguageDetector from 'i18next-browser-languagedetector'

import { DEFAULT_LOCALE } from './utils/const'

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: DEFAULT_LOCALE,
    fallbackLng: DEFAULT_LOCALE,
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
