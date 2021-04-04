import INTL_SET_LANGUAGE from '../types/language'
import { SetLanguageAction } from '../actions/language'

interface LanguageState {
  language: 'en' | 'ru';
}

let initLang: 'en' | 'ru' = 'ru'
const loadLang = () => {
  if (localStorage.getItem('language') === 'en') {
    initLang = 'en'
  } else initLang = 'ru'
}

loadLang()
const initialState: LanguageState = {
  language: initLang || 'ru',
}

const reducer = (state = initialState, action: SetLanguageAction): LanguageState => {
  switch (action.type) {
    case INTL_SET_LANGUAGE: {
      localStorage.setItem('language', action.payload)
      return {
        language: action.payload,
      }
    }

    default:
      return state
  }
}

export default reducer
