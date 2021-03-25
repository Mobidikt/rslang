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
    yield put(actions.requstedUserWordsSuccessed(words))
    yield put(actions.groupWords(words))
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
