import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    load: 'currentOnly',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    // backend: {
    //   loadPath: './locales/{{lng}}.json'
    // },
    resources: {
      en: {
        translation: require('./src/language/en.json')
      },
      es: {
        translation: require('./src/language/es.json')
      }
    }
  });

export default i18n;