/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { put, takeEvery, call } from 'redux-saga/effects'
import {
  FetchUserWordsAction,
  DictionaryActionTypes,
  WordAgregationType,
  AddWordAction,
  UpdateUserWordAction,
  DeleteUserWordAction,
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
    yield put(actions.groupWords())
  } catch (e) {
    yield put(actions.requestedAddWordFailed(e))
  }
}

function* updateUserWord(action: UpdateUserWordAction) {
  const { wordId, userId, word, difficulty } = action.payload
  try {
    yield put(actions.requestedUpdateUserWord())
    yield call(() => WordApi.update(userId, wordId, difficulty))
    const updaterWord = { ...word, _id: word.id, userWord: { difficulty } }

    yield put(actions.requestedUpdateUserWordSuccessed(updaterWord))
    yield put(actions.groupWords())
  } catch (e) {
    yield put(actions.requestedUpddateUserWordFailed(e))
  }
}

function* deleteUserWord(action: DeleteUserWordAction) {
  const { wordId, userId, userWords } = action.payload
  try {
    yield put(actions.requestedDeleteWord())
    yield call(() => WordApi.remove(userId, wordId))
    const wordsWithoutDeletedWord = userWords.filter((word) => word._id !== wordId)
    yield put(actions.requestedDeleteWordSuccessed(wordsWithoutDeletedWord))
    yield put(actions.groupWords())
  } catch (e) {
    yield put(actions.requestedDeleteWordFailed(e))
  }
}

export default function* watchDictionary() {
  yield takeEvery(DictionaryActionTypes.FETCH_USER_WORDS, fetchUserWords)
  yield takeEvery(DictionaryActionTypes.ADD_WORD, addWord)
  yield takeEvery(DictionaryActionTypes.UPDATE_USER_WORD, updateUserWord)
  yield takeEvery(DictionaryActionTypes.DELETE_USER_WORD, deleteUserWord)
}
