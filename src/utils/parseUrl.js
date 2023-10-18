import { languages } from './langs'

export default function parseUrl(url) {
  if (!url) {
    return { slug: url, language: 'en', langSwitch: { en: '/', es: '/es/' } }
  }
  let urlToArray = url?.split('/')
  let defaultLang = 'en'
  let isKnownLang = languages.some((l) => l === urlToArray?.[0])
  let currentLang = isKnownLang ? urlToArray[0] : defaultLang
  let slug = isKnownLang
    ? urlToArray?.slice(1)?.join('/') || undefined
    : urlToArray?.join('/')
  let langSwitch = {}
  languages.forEach((lang) => {
    langSwitch = {
      ...langSwitch,
      [lang]: lang === 'en' ? `/${slug ?? ''}` : `/${lang}/${slug ?? ''}`,
    }
  })
  return { language: currentLang, slug, langSwitch }
}
