import { AppAction, AppState, AppActionTypes } from '../types/app'

interface LanguageState {
  language: 'en' | 'ru';
}

let initLang: 'en' | 'ru' = 'ru'
// eslint-disable-next-line
const loadLang = () => {
  if (localStorage.getItem('language') === 'en') {
    initLang = 'en'
  } else initLang = 'ru'
}
loadLang()
const initialState: AppState = {
  selectedSection: localStorage.getItem('selectedSection') || 'Rslang',
  headerColor: localStorage.getItem('headerColor') || '#70D6FF',
  language: initLang || 'en',
}

const reducer = (state: AppState = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case AppActionTypes.SET_SELECTED_SECTION: {
      localStorage.setItem('selectedSection', action.payload)
      return {
        ...state,
        selectedSection: action.payload,
      }
    }

    case AppActionTypes.SET_HEADER_COLOR: {
      localStorage.setItem('headerColor', action.payload)
      return {
        ...state,
        headerColor: action.payload,
      }
    }

    case AppActionTypes.INTL_SET_LANGUAGE: {
      localStorage.setItem('language', action.payload)
      return {
        ...state,
        language: action.payload,
      }
    }

    default:
      return state
  }
}

export default reducer
