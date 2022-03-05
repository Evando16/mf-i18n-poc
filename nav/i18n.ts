import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    debug: false,
    load: 'currentOnly',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
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