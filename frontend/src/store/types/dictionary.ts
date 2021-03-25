import { WordType } from './lesson'

export type WordAgregationType = {
  _id: string,
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
  textExampleTranslate: string,
  textMeaningTranslate: string,
  wordTranslate: string,
  userWord: {
    difficulty: string,
  },
}

export interface DictionaryState {
  userWords: Array<WordAgregationType>;
  deletedWords: Array<WordAgregationType>;
  difficultWords: Array<WordAgregationType>;
  learnedWords: Array<WordAgregationType>;
  userWordsMode: string;
  isLoadingDictionary: boolean;
  error: string | null;
}

export enum DictionaryActionTypes {
  SET_USER_WORDS_MODE = 'DICTIONARY/SET_USER_WORDS_MODE',
  FETCH_USER_WORDS = 'DICTIONARY/FETCH_USER_WORDS',
  REQUESTED_USER_WORDS = 'DICTIONARY/REQUESTED_USER_WORDS',
  REQUESTED_USER_WORDS_SUCCESSED = 'DICTIONARY/REQUESTED_USER_WORDS_SUCCESSED',
  REQUESTED_USER_WORDS_FAILED = 'DICTIONARY/REQUESTED_USER_WORDS_FAILED',
  ADD_WORD = 'DICTIONARY/ADD_WORD',
  REQUESTED_ADD_WORD = 'DICTIONARY/REQUESTED_ADD_WORD',
  REQUESTED_ADD_WORD_SUCCESSED = 'DICTIONARY/REQUESTED_ADD_WORD_SUCCESSED',
  REQUESTED_ADD_WORD_FAILED = 'DICTIONARY/REQUESTED_ADD_WORD_FAILED',
}

export interface FetchUserWordsAction {
  type: DictionaryActionTypes.FETCH_USER_WORDS;
  payload: string;
}

interface RequestedUserWordsAction {
  type: DictionaryActionTypes.REQUESTED_USER_WORDS;
}

interface RequestedUserWordsSuccessedAction {
  type: DictionaryActionTypes.REQUESTED_USER_WORDS_SUCCESSED;
  payload: {
    userWords: Array<WordAgregationType>,
    deletedWords: Array<WordAgregationType>,
    difficultWords: Array<WordAgregationType>,
    learnedWords: Array<WordAgregationType>,
  };
}

interface RequestedUserWordsFailedAction {
  type: DictionaryActionTypes.REQUESTED_USER_WORDS_FAILED;
  payload: string;
}

export interface AddWordAction {
  type: DictionaryActionTypes.ADD_WORD;
  payload: { userId: string, wordId: string, word: WordType, difficulty: 'difficult' | 'learned' };
}

interface RequestedAddWordAction {
  type: DictionaryActionTypes.REQUESTED_ADD_WORD;
}

interface RequestedAddWordSuccessedAction {
  type: DictionaryActionTypes.REQUESTED_ADD_WORD_SUCCESSED;
  payload: WordAgregationType;
}

interface RequestedAddWordFailedAction {
  type: DictionaryActionTypes.REQUESTED_ADD_WORD_FAILED;
  payload: string;
}

export type DictionaryAction =
  | FetchUserWordsAction
  | RequestedUserWordsAction
  | RequestedUserWordsSuccessedAction
  | RequestedUserWordsFailedAction
  | AddWordAction
  | RequestedAddWordAction
  | RequestedAddWordSuccessedAction
  | RequestedAddWordFailedAction
