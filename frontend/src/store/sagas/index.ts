import { all } from 'redux-saga/effects'
import watchLesson from './lessonSagas'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* watchSagas() {
  yield all([watchLesson()])
}
