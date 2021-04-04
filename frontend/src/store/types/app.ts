export interface AppState {
  selectedSection: string;
  headerColor: string;
  language: 'en' | 'ru';
}

export enum AppActionTypes {
  SET_SELECTED_SECTION = 'APP/SET_SELECTED_SECTION',
  SET_HEADER_COLOR = 'APP/SET_HEADER_COLOR',
  INTL_SET_LANGUAGE = 'APP/INTL_SET_LANGUAGE',
}

export interface SetSelectedSection {
  type: AppActionTypes.SET_SELECTED_SECTION;
  payload: string;
}

interface SetHeaderBg {
  type: AppActionTypes.SET_HEADER_COLOR;
  payload: string;
}

interface IntlSetlanguage {
  type: AppActionTypes.INTL_SET_LANGUAGE;
  payload: 'en' | 'ru';
}

export type AppAction = SetSelectedSection | SetHeaderBg | IntlSetlanguage
