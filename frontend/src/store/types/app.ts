export interface AppState {
  selectedSection: string;
}

export enum AppActionTypes {
  SET_SELECTED_SECTION = 'APP/SET_SELECTED_SECTION',
}

export interface SetSelectedSection {
  type: AppActionTypes.SET_SELECTED_SECTION;
  payload: string;
}

export type AppAction = SetSelectedSection
