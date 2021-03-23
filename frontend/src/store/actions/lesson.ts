import { LessonAction, LessonActionTypes, WordType } from '../types/lesson'

const setCurrentPage = (page: number): LessonAction => ({
  type: LessonActionTypes.SET_CURRENT_PAGE,
  payload: page,
})

const setCurrentGroup = (group: number): LessonAction => ({
  type: LessonActionTypes.SET_CURRENT_GROUP,
  payload: group,
})

const fetchWords = (group: number, page: number): LessonAction => ({
  type: LessonActionTypes.FETCH_WORDS,
  payload: { group, page },
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

export default {
  setCurrentPage,
  setCurrentGroup,
  fetchWords,
  requestedWords,
  requestedWordsSuccessed,
  requestedWordsFailed,
}
