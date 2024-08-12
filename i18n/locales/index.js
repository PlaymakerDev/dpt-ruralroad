import en from './en'
import th from './th'

const lang = {
  en,
  th
}

export const trans = (locale, module) => {
  if (module) {
    return lang[locale][module]
  } else {
    return lang[locale]
  }
}

export default lang
