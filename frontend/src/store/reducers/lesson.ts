import { LessonAction, LessonState, LessonActionTypes } from '../types/lesson'

const initialState: LessonState = {
  words: null,
  countLessons: 6,
  currentGroup: null,
  currentPage: null,
  currentWord: null,
  isLoading: false,
  error: null,
}

const reducer = (state: LessonState = initialState, action: LessonAction): LessonState => {
  switch (action.type) {
    case LessonActionTypes.SET_CURRENT_GROUP: {
      return {
        ...state,
        currentGroup: action.payload,
      }
    }

    case LessonActionTypes.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload,
      }
    }

    case LessonActionTypes.REQUESTED_WORDS: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case LessonActionTypes.REQUESTED_WORDS_SUCCESSED: {
      return {
        ...state,
        isLoading: false,
        words: action.payload,
      }
    }

    case LessonActionTypes.REQUESTED_WORDS_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    }

    default:
      return state
  }
}

export default reducer
