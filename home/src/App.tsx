import React, { lazy, Suspense, useEffect, useState } from 'react'
import { I18nextProvider, initReactI18next, useTranslation } from 'react-i18next'

import './app.css'
import i18next from 'i18next'
import i18n, { changeLanguage } from '../i18n'
import NavMf, { getTranslation } from 'nav/Microfront'


const headerI18nInstance = () => {
  const newInstance = i18next.createInstance()
  const [loading, setLoading] = useState(true)

    ; (async () => {
      const lang = i18n.language
      const instanceCopies = await getTranslation(lang)

      newInstance.init({
        fallbackLng: 'en',
        lng: lang,
        resources: {
          [lang]: {
            translation: instanceCopies
          }
        },
        interpolation: {
          escapeValue: false
        },
        load: 'currentOnly',
        debug: true
      }, (err, _t) => {
        if (err) return console.log('something went wrong loading', err);
        setLoading(false)
      })

    })()

  return { instance: newInstance, loading }
}

const App = () => {
  const { t, i18n } = useTranslation()
  const { instance, loading } = headerI18nInstance()

  useEffect(() => {
    console.log('HOME KEYS ->', i18n.store.data);
  }, [])

  if (loading) {
    return <div>loading copies</div>
  }

  return (
    <>
      <Suspense fallback={<div>In cases that the NavMf did not load properly</div>}>
        <I18nextProvider i18n={instance}>
          <NavMf />
        </I18nextProvider>
      </Suspense>
      <p>{t('my_translation_test')}</p>
      <div>
        <button onClick={() => changeLanguage('es')}>change to ES</button>
        <button onClick={() => changeLanguage('en')}>change to EN</button>
      </div>
    </>
  );
}

export default App;
