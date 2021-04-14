import { all } from 'redux-saga/effects'
import watchLesson from './lessonSagas'
import watchAuth from './authSagas'
import watchDictionary from './dictionarySagas'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* watchSagas() {
  yield all([watchLesson(), watchAuth(), watchDictionary()])
}
