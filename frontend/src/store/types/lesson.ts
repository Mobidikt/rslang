export type WordType = {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string,
}

type LessonType = {
  title: string,
  color: string,
}

export interface LessonState {
  words: Array<WordType> | null;
  lessons: Array<LessonType>;
  currentGroup: number | null;
  currentPage: number | null;
  currentWord: WordType | null;
  isLoading: boolean;
  error: string | null;
}

export enum LessonActionTypes {
  SET_CURRENT_PAGE = 'LESSON/SET_CURRENT_PAGE',
  SET_CURRENT_GROUP = 'LESSON/SET_CURRENT_GROUP',
  FETCH_WORDS = 'LESSON/FETCH_WORDS',
  REQUESTED_WORDS = 'LESSON/REQUESTED_WORDS',
  REQUESTED_WORDS_SUCCESSED = 'LESSON/REQUESTED_WORDS_SUCCESSED',
  REQUESTED_WORDS_FAILED = 'LESSON/REQUESTED_WORDS_FAILED',
}

export type SetCurrentPageAction = {
  type: LessonActionTypes.SET_CURRENT_PAGE,
  payload: number,
}

export type SetCurrentGroupAction = {
  type: LessonActionTypes.SET_CURRENT_GROUP,
  payload: number,
}

export type FetchWordsAction = {
  type: LessonActionTypes.FETCH_WORDS,
  payload: { group: number, page: number },
}

export type RequestedWordsAction = {
  type: LessonActionTypes.REQUESTED_WORDS,
}

export type RequestedWordsSuccessedAction = {
  type: LessonActionTypes.REQUESTED_WORDS_SUCCESSED,
  payload: Array<WordType>,
}

export type RequestedWordsFailedAction = {
  type: LessonActionTypes.REQUESTED_WORDS_FAILED,
  payload: string,
}

export type LessonAction =
  | SetCurrentPageAction
  | SetCurrentGroupAction
  | FetchWordsAction
  | RequestedWordsAction
  | RequestedWordsSuccessedAction
  | RequestedWordsFailedAction
