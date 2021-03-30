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
  GROUP_WORDS = 'DICTIONARY/GROUP_WORDS',
  CLEAR_USER_WORDS = 'DICTIONARY/CLEAR_USER_WORDS',
  UPDATE_USER_WORD = 'DICTIONARY/UPDATE_USER_WORD',
  REQUESTED_UPDATE_USER_WORD = 'DICTIONARY/REQUESTED_UPDATE_USER_WORD',
  REQUESTED_UPDATE_USER_WORD_SUCCESSED = 'DICTIONARY/REQUESTED_UPDATE_USER_WORD_SUCCESSED',
  REQUESTED_UPDATE_USER_WORD_FAILED = 'DICTIONARY/REQUESTED_UPDATE_USER_WORD_FAILED',
  DELETE_USER_WORD = 'DICTIONARY/DELETE_USER_WORD',
  REQUESTED_DELETE_USER_WORD = 'DICTIONARY/REQUESTED_DELETE_USER_WORD',
  REQUESTED_DELETE_USER_WORD_SUCCESSED = 'DICTIONARY/REQUESTED_DELETE_USER_WORD_SUCCESSED',
  REQUESTED_DELETE_USER_WORD_FAILED = 'DICTIONARY/REQUESTED_DELETE_USER_WORD_FAILED',
}

interface ClearUserWordsAction {
  type: DictionaryActionTypes.CLEAR_USER_WORDS;
}

export interface GroupWordsAction {
  type: DictionaryActionTypes.GROUP_WORDS;
  payload: Array<WordAgregationType>;
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
  payload: Array<WordAgregationType>;
}

interface RequestedUserWordsFailedAction {
  type: DictionaryActionTypes.REQUESTED_USER_WORDS_FAILED;
  payload: string;
}

export interface AddWordAction {
  type: DictionaryActionTypes.ADD_WORD;
  payload: {
    userId: string,
    wordId: string,
    word: WordType,
    difficulty: 'difficult' | 'learned' | 'deleted',
  };
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

export interface UpdateUserWordAction {
  type: DictionaryActionTypes.UPDATE_USER_WORD;
  payload: {
    userId: string,
    wordId: string,
    word: WordType,
    difficulty: 'difficult' | 'learned' | 'deleted',
  };
}

interface RequestedUpdateUserWordAction {
  type: DictionaryActionTypes.REQUESTED_UPDATE_USER_WORD;
}

interface RequestedUpdateUserWordSuccessedAction {
  type: DictionaryActionTypes.REQUESTED_UPDATE_USER_WORD_SUCCESSED;
  payload: WordAgregationType;
}

interface RequestedUpdateUserWordFailedAction {
  type: DictionaryActionTypes.REQUESTED_UPDATE_USER_WORD_FAILED;
  payload: string;
}

export interface DeleteUserWordAction {
  type: DictionaryActionTypes.DELETE_USER_WORD;
  payload: { wordId: string, userWords: Array<WordAgregationType>, userId: string };
}

interface RequestedDeleteWordAction {
  type: DictionaryActionTypes.REQUESTED_DELETE_USER_WORD;
}

interface RequestedDeleteWordSuccessedAction {
  type: DictionaryActionTypes.REQUESTED_DELETE_USER_WORD_SUCCESSED;
  payload: Array<WordAgregationType>;
}

interface RequestedDeleteWordFailedAction {
  type: DictionaryActionTypes.REQUESTED_DELETE_USER_WORD_FAILED;
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
  | GroupWordsAction
  | ClearUserWordsAction
  | RequestedUpdateUserWordAction
  | RequestedUpdateUserWordFailedAction
  | RequestedUpdateUserWordSuccessedAction
  | UpdateUserWordAction
  | DeleteUserWordAction
  | RequestedDeleteWordAction
  | RequestedDeleteWordSuccessedAction
  | RequestedDeleteWordFailedAction
