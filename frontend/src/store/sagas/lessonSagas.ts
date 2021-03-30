import { put, takeEvery, call } from 'redux-saga/effects'
import { FetchWordsAction, LessonActionTypes, FetchWordAction, WordType } from '../types/lesson'
import actions from '../actions/lesson'

import WordApi from '../../services/WordApi'

function* fetchWords(action: FetchWordsAction) {
  const { group, page, deletedWords } = action.payload

  const deletedWordsIdx: Array<string> = deletedWords.map((deletedWord) => deletedWord._id)

  try {
    yield put(actions.requestedWords())
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: Array<WordType> = yield call(() => WordApi.getByGroupAndPage(group, page))
    const wordsWithoutDeletedWords = data
      .map((word) => {
        if (deletedWordsIdx.includes(word.id)) {
          const newWord = {
            isDeleted: true,
            ...word,
          }
          return newWord
        }
        return word
      })
      .filter((word) => word.isDeleted !== true)

    yield put(actions.requestedWordsSuccessed(wordsWithoutDeletedWords))
  } catch (e) {
    yield put(actions.requestedWordsFailed(e))
  }
}

function* fetchWord(action: FetchWordAction) {
  try {
    yield put(actions.requestedWord())
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data } = yield call(() => WordApi.getById(action.payload))
    yield put(actions.requestedWordSuccessed(data))
  } catch (e) {
    yield put(actions.requestedWordFailed(e))
  }
}

export default function* watchLesson() {
  yield takeEvery(LessonActionTypes.FETCH_WORDS, fetchWords)
  yield takeEvery(LessonActionTypes.FETCH_WORD, fetchWord)
}
