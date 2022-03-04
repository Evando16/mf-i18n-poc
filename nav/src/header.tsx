import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Header = () => {
    const { t, i18n } = useTranslation()

    useEffect(() => {
        console.log('NAV KEYS ->', i18n.store.data);
    }, [])

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