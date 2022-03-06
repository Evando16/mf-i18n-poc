import Header from "./header";

// This file gonna be used to export the Microfront without start a i18next instance

/**
 * the i18next instance gonna be provider with I18nextProvider
 *
 * WHY?
 * 
 * When you instance a new using `.use(initReactI18next)` it will override the instance of the `shell` application
 */

const defaultLanguage = 'en'

export async function getTranslation(userLanguage: string) {
    const lang = userLanguage || defaultLanguage
    const resource = await import(`./language/${lang}.json`)

    return resource
}

export default Header
