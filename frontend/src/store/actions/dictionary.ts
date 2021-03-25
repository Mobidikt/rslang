import { DictionaryAction, DictionaryActionTypes, WordAgregationType } from '../types/dictionary'
import { WordType } from '../types/lesson'

const fetchUserWords = (userId: string): DictionaryAction => ({
  type: DictionaryActionTypes.FETCH_USER_WORDS,
  payload: userId,
})

const requstedUserWords = (): DictionaryAction => ({
  type: DictionaryActionTypes.REQUESTED_USER_WORDS,
})

const requstedUserWordsSuccessed = (
  userWords: Array<WordAgregationType>,
  deletedWords: Array<WordAgregationType>,
  difficultWords: Array<WordAgregationType>,
  learnedWords: Array<WordAgregationType>,
): DictionaryAction => ({
  type: DictionaryActionTypes.REQUESTED_USER_WORDS_SUCCESSED,
  payload: { userWords, deletedWords, difficultWords, learnedWords },
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

export default {
  fetchUserWords,
  requstedUserWords,
  requstedUserWordsSuccessed,
  requstedUserWordsFailed,
  addWord,
  requestedAddWord,
  requestedAddWordSuccessed,
  requestedAddWordFailed,
}
