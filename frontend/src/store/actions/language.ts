import INTL_SET_LANGUAGE from '../types/language'

export type SetLanguageAction = {
  type: typeof INTL_SET_LANGUAGE,
  payload: 'en' | 'ru',
}

export const setLanguage = (language: 'en' | 'ru'): SetLanguageAction => ({
  type: INTL_SET_LANGUAGE,
  payload: language,
})
