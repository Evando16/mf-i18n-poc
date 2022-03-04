const defaultLanguage = 'en'

export async function getTranslation(userLanguage: string) {
    const lang = userLanguage || defaultLanguage
    const resource = await import(`./language/${lang}.json`)

    return resource
}