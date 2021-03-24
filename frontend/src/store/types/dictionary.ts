import { WordType } from './lesson'


export interface DictionaryState {
  userWords: Array<WordType>;
  userWordsMode: string;
}

export enum DictionaryActionTypes {
  SET_USER_WORDS = 'DICTIONARY/SET_USER_WORDS',
  SET_USER_WORDS_MODE = 'DICTIONARY/SET_USER_WORDS_MODE',
}
