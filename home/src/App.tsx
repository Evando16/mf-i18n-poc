import React, { lazy, Suspense, useEffect, useState } from 'react'
import { getTranslation } from 'nav/translation'
import { I18nextProvider, initReactI18next, useTranslation } from 'react-i18next'

import './app.css'
import i18next from 'i18next'
import i18n, { changeLanguage } from '../i18n'
const Header = lazy(() => import('nav/Header'))

const headerI18nInstance = () => {
  const newInstance = i18next.createInstance()
  const [loading, setLoading] = useState(true)

    ; (async () => {
      const lang = i18n.language
      const instanceCopies = await getTranslation(lang)
      // just to simulate a loading
      setTimeout(() => { setLoading(false) }, 3000)

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
        // setLoading(false)
      })

      // console.log('MF lang->', newInstance.language)

    })()

  return { instance: newInstance, loading }
}

const App = () => {
  const { t } = useTranslation()
  const { instance, loading } = headerI18nInstance()

  // useEffect(() => {
  //   // console.log('MF lang->', headerInstance.language);
  //   console.log('Shell lang->', i18n.language);
  //   // headerInstance.changeLanguage(i18n.language)
  // }, [i18n.language])

  // useEffect(() => {
  //   console.log('HOME KEYS ->', i18n.store.data);
  // }, [])

  if (loading) {
    return <div>loading copies</div>
  }

  return (
    <>
      <Suspense fallback={<div>In cases that the Header did not load properly</div>}>
        <I18nextProvider i18n={instance}>
          <Header />
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
