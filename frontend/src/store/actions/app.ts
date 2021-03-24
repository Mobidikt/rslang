import { AppAction, AppActionTypes } from '../types/app'

const setSelectedSection = (title: string): AppAction => ({
  type: AppActionTypes.SET_SELECTED_SECTION,
  payload: title,
})

export default {
  setSelectedSection,
}
