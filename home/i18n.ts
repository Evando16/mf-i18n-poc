import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language)
}

i18n
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    cache: {
      enabled: false
    },
    interpolation: {
      escapeValue: false,
    },
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