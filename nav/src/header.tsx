import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import '../i18n';

const Header = (props: { lang: string }) => {
    const { t, i18n } = useTranslation()
    const { lang } = props

    useEffect(() => {
        console.log('NAV KEYS ->', i18n.store.data);
        console.log(lang);
        if (lang !== i18n.language) {
            i18n.changeLanguage(lang)
        }
    }, [lang])

    return (
        <div style={{
            backgroundColor: 'lightcoral',
            padding: '1rem'
        }}>
            <p>HEADER</p>
            <p>{t('my_translation_test')}</p>
        </div>
    )
}

export default Header