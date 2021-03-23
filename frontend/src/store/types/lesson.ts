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
  words: Array<WordType>;
  lessons: Array<LessonType>;
  currentGroup: number | null;
  currentPage: number;
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
  FETCH_WORD = 'LESSON/FETCH_WORD',
  REQUESTED_WORD = 'LESSON/REQUESTED_WORD',
  REQUESTED_WORD_SUCCESSED = 'LESSON/REQUESTED_WORD_SUCCESSED',
  REQUESTED_WORD_FAILED = 'LESSON/REQUESTED_WORD_FAILED',
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

export type FetchWordAction = {
  type: LessonActionTypes.FETCH_WORD,
  payload: string,
}

export type RequestedWordAction = {
  type: LessonActionTypes.REQUESTED_WORD,
}

export type RequestedWordSuccessedAction = {
  type: LessonActionTypes.REQUESTED_WORD_SUCCESSED,
  payload: WordType,
}

export type RequestedWordFailedAction = {
  type: LessonActionTypes.REQUESTED_WORD_FAILED,
  payload: string,
}

export type LessonAction =
  | SetCurrentPageAction
  | SetCurrentGroupAction
  | FetchWordsAction
  | RequestedWordsAction
  | RequestedWordsSuccessedAction
  | RequestedWordsFailedAction
  | FetchWordAction
  | RequestedWordAction
  | RequestedWordSuccessedAction
  | RequestedWordFailedAction