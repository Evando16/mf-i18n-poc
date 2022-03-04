import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language)
}

i18n
  .use(HttpApi)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: 'en',
    cache: {
      enabled: false
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // a different way to load all the files
    backend: {
      loadPath: './locales/{{lng}}.json'
    }
    // resources: {
    //   en: {
    //     translation: require('./public/locales/en.json')
    //   },
    //   es: {
    //     translation: require('./public/locales/es.json')
    //   }
    // }
  });

export default i18n;