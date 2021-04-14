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
  difficulty: 'difficult' | 'learned' | 'deleted',
  currentGame: 'sprint' | 'ourGame' | 'audioCall' | 'savannah' | '',
  isRight: boolean,
): DictionaryAction => ({
  type: DictionaryActionTypes.ADD_WORD,
  payload: { userId, wordId, word, difficulty, currentGame, isRight },
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
  currentGame: 'sprint' | 'ourGame' | 'audioCall' | 'savannah' | '',
  isRight: boolean,
): DictionaryAction => ({
  type: DictionaryActionTypes.UPDATE_USER_WORD,
  payload: { userId, wordId, word, difficulty, currentGame, isRight },
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

const deleteUserWord = (
  wordId: string,
  userWords: Array<WordAgregationType>,
  userId: string,
): DictionaryAction => ({
  type: DictionaryActionTypes.DELETE_USER_WORD,
  payload: { wordId, userWords, userId },
})

const requestedDeleteWord = (): DictionaryAction => ({
  type: DictionaryActionTypes.REQUESTED_DELETE_USER_WORD,
})

const requestedDeleteWordSuccessed = (userWords: Array<WordAgregationType>): DictionaryAction => ({
  type: DictionaryActionTypes.REQUESTED_DELETE_USER_WORD_SUCCESSED,
  payload: userWords,
})

const requestedDeleteWordFailed = (e: string): DictionaryAction => ({
  type: DictionaryActionTypes.REQUESTED_DELETE_USER_WORD_FAILED,
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
  deleteUserWord,
  requestedDeleteWord,
  requestedDeleteWordSuccessed,
  requestedDeleteWordFailed,
}
