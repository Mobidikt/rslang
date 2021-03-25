/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { put, takeEvery, call } from 'redux-saga/effects'
import {
  FetchUserWordsAction,
  DictionaryActionTypes,
  WordAgregationType,
  AddWordAction,
} from '../types/dictionary'
import actions from '../actions/dictionary'
import WordApi from '../../services/WordApi'

function* fetchUserWords(action: FetchUserWordsAction) {
  const userId = action.payload

  try {
    yield put(actions.requstedUserWords())
    const words: WordAgregationType[] = yield call(WordApi.getUserWords, userId)
    const deletedWords = words.filter((word) => word.userWord.difficulty === 'deleted')
    const difficultWords = words.filter((word) => word.userWord.difficulty === 'difficult')
    const learnedWords = words.filter(
      (word) => word.userWord.difficulty === 'learning' || 'difficult',
    )

    yield put(actions.requstedUserWordsSuccessed(words, deletedWords, difficultWords, learnedWords))
  } catch (e) {
    yield put(actions.requstedUserWordsFailed(e))
  }
}

function* addWord(action: AddWordAction) {
  const { userId, wordId, word, difficulty } = action.payload
  try {
    yield put(actions.requestedAddWord())
    yield call(() => WordApi.save(userId, wordId, difficulty))
    const wordWithDifficulty = { ...word, _id: word.id, userWord: { difficulty } }
    yield put(actions.requestedAddWordSuccessed(wordWithDifficulty))
  } catch (e) {
    yield put(actions.requestedAddWordFailed(e))
  }
}

export default function* watchDictionary() {
  yield takeEvery(DictionaryActionTypes.FETCH_USER_WORDS, fetchUserWords)
  yield takeEvery(DictionaryActionTypes.ADD_WORD, addWord)
}
