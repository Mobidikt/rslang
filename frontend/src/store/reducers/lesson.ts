import { LessonAction, LessonState, LessonActionTypes } from '../types/lesson'

const initialState: LessonState = {
  words: [],
  lessons: [
    { title: 'lesson 1', color: '#E9FF70' },
    { title: 'lesson 2', color: '#FFD670' },
    { title: 'lesson 3', color: '#FF9770' },
    { title: 'lesson 4', color: '#FF70A6' },
    { title: 'lesson 5', color: '#70D6FF' },
    { title: 'lesson 6', color: '#C1FF9B' },
  ],
  currentGroup: null,
  currentPage: 0,
  currentWord: null,
  currentWordIsDifficult: false,
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

    case LessonActionTypes.REQUESTED_WORD: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case LessonActionTypes.REQUESTED_WORD_SUCCESSED: {
      return {
        ...state,
        isLoading: false,
        currentWord: action.payload,
      }
    }

    case LessonActionTypes.REQUESTED_WORD_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    }

    case LessonActionTypes.SET_CURRENT_WORD_IS_DIFFICULT: {
      return {
        ...state,
        currentWordIsDifficult: action.payload,
      }
    }

    default:
      return state
  }
}

export default reducer
