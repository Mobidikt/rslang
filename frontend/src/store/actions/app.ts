import { AppAction, AppActionTypes } from '../types/app'

const setSelectedSection = (title: string): AppAction => ({
  type: AppActionTypes.SET_SELECTED_SECTION,
  payload: title,
})

const setHeaderColor = (color: string): AppAction => ({
  type: AppActionTypes.SET_HEADER_COLOR,
  payload: color,
})

export default {
  setSelectedSection,
  setHeaderColor,
}
