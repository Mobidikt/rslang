import { DictionaryAction, DictionaryActionTypes, WordAgregationType } from '../types/dictionary'
import { WordType } from '../types/lesson'

const fetchUserWords = (userId: string): DictionaryAction => ({
  type: DictionaryActionTypes.FETCH_USER_WORDS,
  payload: userId,
})

const requstedUserWords = (): DictionaryAction => ({
  type: DictionaryActionTypes.REQUESTED_USER_WORDS,
})

const requstedUserWordsSuccessed = (userWords: Array<WordAgregationType>): DictionaryAction => ({
  type: DictionaryActionTypes.REQUESTED_USER_WORDS_SUCCESSED,
  payload: userWords,
})

const requstedUserWordsFailed = (e: string): DictionaryAction => ({
  type: DictionaryActionTypes.REQUESTED_USER_WORDS_FAILED,
  payload: e,
})

const addWord = (
  userId: string,
  wordId: string,
  word: WordType,
  difficulty: 'difficult' | 'learned',
): DictionaryAction => ({
  type: DictionaryActionTypes.ADD_WORD,
  payload: { userId, wordId, word, difficulty },
})

const requestedAddWord = (): DictionaryAction => ({
  type: DictionaryActionTypes.REQUESTED_ADD_WORD,
})

const requestedAddWordSuccessed = (userWord: WordAgregationType): DictionaryAction => ({
  type: DictionaryActionTypes.REQUESTED_ADD_WORD_SUCCESSED,
  payload: userWord,
})

const requestedAddWordFailed = (e: string): DictionaryAction => ({
  type: DictionaryActionTypes.REQUESTED_ADD_WORD_FAILED,
  payload: e,
})

const groupWords = (words: Array<WordAgregationType> = []): DictionaryAction => ({
  type: DictionaryActionTypes.GROUP_WORDS,
  payload: words,
})

const clearUserWords = (): DictionaryAction => ({
  type: DictionaryActionTypes.CLEAR_USER_WORDS,
})

const updateUserWord = (
  userId: string,
  wordId: string,
  word: WordType,
  difficulty: 'difficult' | 'learned' | 'deleted',
): DictionaryAction => ({
  type: DictionaryActionTypes.UPDATE_USER_WORD,
  payload: { userId, wordId, word, difficulty },
})

const requestedUpdateUserWord = (): DictionaryAction => ({
  type: DictionaryActionTypes.REQUESTED_UPDATE_USER_WORD,
})

const requestedUpdateUserWordSuccessed = (userWord: WordAgregationType): DictionaryAction => ({
  type: DictionaryActionTypes.REQUESTED_UPDATE_USER_WORD_SUCCESSED,
  payload: userWord,
})

const requestedUpddateUserWordFailed = (e: string): DictionaryAction => ({
  type: DictionaryActionTypes.REQUESTED_USER_WORDS_FAILED,
  payload: e,
})

export default {
  fetchUserWords,
  requstedUserWords,
  requstedUserWordsSuccessed,
  requstedUserWordsFailed,
  addWord,
  requestedAddWord,
  requestedAddWordSuccessed,
  requestedAddWordFailed,
  groupWords,
  clearUserWords,
  updateUserWord,
  requestedUpdateUserWord,
  requestedUpdateUserWordSuccessed,
  requestedUpddateUserWordFailed,
}