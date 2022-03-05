import React, { lazy, Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { changeLanguage } from '../i18n'

import './app.css'

const Header = lazy(() => import('nav/Header'))

const App = () => {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    console.log('HOME KEYS ->', i18n.store.data);
  }, [])

  return (
    <>
      <Suspense fallback={<div>In cases that the Header did not load properly</div>}>
        <Header />
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
