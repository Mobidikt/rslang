import { AppAction, AppState, AppActionTypes } from '../types/app'

const initialState: AppState = {
  selectedSection: localStorage.getItem('selectedSection') || 'Rslang',
  headerColor: localStorage.getItem('headerColor') || '#70D6FF',
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
    default:
      return state
  }
}

export default reducer
