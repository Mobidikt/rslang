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
import WordApi, { UpdateGamesCountAnswersType } from '../../services/WordApi'
import StatisticsApi from '../../services/StatisticsApi'

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
  const { userId, wordId, word, difficulty, currentGame } = action.payload
  const games = {
    sprint: 0,
    savannah: 0,
    audioCall: 0,
    ourGame: 0,
  }
  if (currentGame) {
    games[currentGame] = 1
  }

  try {
    yield put(actions.requestedAddWord())

    yield call(() => WordApi.save(userId, wordId, difficulty, currentGame))

    yield call(() => StatisticsApi.add(userId))

    const wordWithDifficulty = { ...word, _id: word.id, userWord: { difficulty, games } }
    yield put(actions.requestedAddWordSuccessed(wordWithDifficulty))
    yield put(actions.groupWords())
  } catch (e) {
    yield put(actions.requestedAddWordFailed(e))
  }
}

function* updateUserWord(action: UpdateUserWordAction) {
  const { wordId, userId, word, difficulty, currentGame } = action.payload
  try {
    yield put(actions.requestedUpdateUserWord())
    let games
    let updaterWord
    if (currentGame) {
      const data: UpdateGamesCountAnswersType = yield call(() =>
        WordApi.updateGamesCountAnswers(userId, wordId, currentGame),
      )
      games = data.games
    }
    yield call(() => WordApi.update(userId, wordId, difficulty))
    if (currentGame) {
      updaterWord = { ...word, _id: word.id, userWord: { difficulty, games } }
    } else {
      updaterWord = { ...word, _id: word.id, userWord: { difficulty } }
    }

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
