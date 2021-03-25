/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { put, takeEvery, call } from 'redux-saga/effects'
import {
  FetchUserWordsAction,
  DictionaryActionTypes,
  WordAgregationType,
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
    const learnedWords = words.filter((word) => word.userWord.difficulty === 'learning')

    yield put(actions.requstedUserWordsSuccessed(words, deletedWords, difficultWords, learnedWords))
  } catch (e) {
    yield put(actions.requstedUserWordsFailed(e))
  }
}

export default function* watchDictionary() {
  yield takeEvery(DictionaryActionTypes.FETCH_USER_WORDS, fetchUserWords)
}
