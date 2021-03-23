import { put, takeEvery, call } from 'redux-saga/effects'
import { FetchWordsAction, LessonActionTypes } from '../types/lesson'
import actions from '../actions/lesson'

import WordApi from '../../services/WordApi'

function* fetchWords(action: FetchWordsAction) {
  const { group, page } = action.payload

  try {
    yield put(actions.requestedWords())
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data } = yield call(() => WordApi.getByGroupAndPage(group, page))
    yield put(actions.requestedWordsSuccessed(data))
  } catch (e) {
    yield put(actions.requestedWordsFailed(e))
  }
}

export default function* watchLesson() {
  yield takeEvery(LessonActionTypes.FETCH_WORDS, fetchWords)
}
