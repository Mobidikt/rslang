export interface AppState {
  selectedSection: string;
  headerColor: string;
}

export enum AppActionTypes {
  SET_SELECTED_SECTION = 'APP/SET_SELECTED_SECTION',
  SET_HEADER_COLOR = 'APP/SET_HEADER_COLOR',
}

export interface SetSelectedSection {
  type: AppActionTypes.SET_SELECTED_SECTION;
  payload: string;
}

interface SetHeaderBg {
  type: AppActionTypes.SET_HEADER_COLOR;
  payload: string;
}

export type AppAction = SetSelectedSection | SetHeaderBg
