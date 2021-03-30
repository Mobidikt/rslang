import { WordAgregationType } from '../types/dictionary'
import { LessonAction, LessonActionTypes, WordType } from '../types/lesson'

const setCurrentPage = (page: number): LessonAction => ({
  type: LessonActionTypes.SET_CURRENT_PAGE,
  payload: page,
})

const setCurrentGroup = (group: number): LessonAction => ({
  type: LessonActionTypes.SET_CURRENT_GROUP,
  payload: group,
})

const fetchWords = (
  group: number,
  page: number,
  deletedWords: Array<WordAgregationType>,
): LessonAction => ({
  type: LessonActionTypes.FETCH_WORDS,
  payload: { group, page, deletedWords },
})

const requestedWords = (): LessonAction => ({
  type: LessonActionTypes.REQUESTED_WORDS,
})

const requestedWordsSuccessed = (words: Array<WordType>): LessonAction => ({
  type: LessonActionTypes.REQUESTED_WORDS_SUCCESSED,
  payload: words,
})

const requestedWordsFailed = (error: string): LessonAction => ({
  type: LessonActionTypes.REQUESTED_WORDS_FAILED,
  payload: error,
})

const fetchWord = (id: string): LessonAction => ({
  type: LessonActionTypes.FETCH_WORD,
  payload: id,
})

const requestedWord = (): LessonAction => ({
  type: LessonActionTypes.REQUESTED_WORD,
})

const requestedWordSuccessed = (word: WordType): LessonAction => ({
  type: LessonActionTypes.REQUESTED_WORD_SUCCESSED,
  payload: word,
})

const requestedWordFailed = (error: string): LessonAction => ({
  type: LessonActionTypes.REQUESTED_WORD_FAILED,
  payload: error,
})

const setCurrentWordIsDifficult = (status: boolean): LessonAction => ({
  type: LessonActionTypes.SET_CURRENT_WORD_IS_DIFFICULT,
  payload: status,
})

const setFromCurrentGroup = (status: boolean): LessonAction => ({
  type: LessonActionTypes.SET_FROM_CURRENT_GROUP,
  payload: status,
})

const addDeletedPage = (page: number): LessonAction => ({
  type: LessonActionTypes.ADD_DELETED_PAGE,
  payload: page,
})

const setFirstPage = (page: number): LessonAction => ({
  type: LessonActionTypes.SET_FIRST_PAGE,
  payload: page,
})

const removeDeletedPage = (page: number): LessonAction => ({
  type: LessonActionTypes.DELETE_DELETED_PAGE,
  payload: page,
})

export default {
  setCurrentPage,
  setCurrentGroup,
  fetchWords,
  requestedWords,
  requestedWordsSuccessed,
  requestedWordsFailed,
  fetchWord,
  requestedWord,
  requestedWordSuccessed,
  requestedWordFailed,
  setCurrentWordIsDifficult,
  setFromCurrentGroup,
  addDeletedPage,
  setFirstPage,
  removeDeletedPage,
}
