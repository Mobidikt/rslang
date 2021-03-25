import { DictionaryAction, DictionaryActionTypes, WordAgregationType } from '../types/dictionary'

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

export default {
  fetchUserWords,
  requstedUserWords,
  requstedUserWordsSuccessed,
  requstedUserWordsFailed,
}
