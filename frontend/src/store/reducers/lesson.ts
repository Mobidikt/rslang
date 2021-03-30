import { LessonAction, LessonState, LessonActionTypes } from '../types/lesson'

const getCurrentPageFromLocalStorage = (): number => {
  const currentPage = localStorage.getItem('currentPage')

  if (currentPage) {
    return typeof +currentPage === 'number' ? +currentPage : 0
  }

  return 0
}

const word = {
  id: '5e9f5e43434e35eb9e72bc21af519',
  group: 0,
  page: 6,
  word: 'announce',
  image: 'files/07_0122.jpg',
  audio: 'files/07_0122.mp3',
  audioMeaning: 'files/07_0122_meaning.mp3',
  audioExample: 'files/07_0122_example.mp3',
  textMeaning: 'To <i>announce</i> something is to make it known.',
  textExample: 'He <b>announced</b> to everyone his new idea for the company.',
  transcription: '[ənáuns]',
  textExampleTranslate: 'Он объявил всем свою новую идею для компании',
  textMeaningTranslate: 'Объявить что-то значит сделать это известным',
  wordTranslate: 'объявить',
  isDeleted: true,
}

const initialState: LessonState = {
  words: [word],
  lessons: [
    { title: 'lesson 1', color: '#E9FF70' },
    { title: 'lesson 2', color: '#FFD670' },
    { title: 'lesson 3', color: '#FF9770' },
    { title: 'lesson 4', color: '#FF70A6' },
    { title: 'lesson 5', color: '#70D6FF' },
    { title: 'lesson 6', color: '#C1FF9B' },
  ],
  currentGroup: null,
  currentPage: getCurrentPageFromLocalStorage(),
  currentWord: null,
  currentWordIsDifficult: false,
  isLoading: false,
  error: null,
  fromCurrentGroup: false,
  deletedPages: [],
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
      localStorage.setItem('currentPage', JSON.stringify(action.payload))
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

    case LessonActionTypes.SET_FROM_CURRENT_GROUP: {
      return {
        ...state,
        fromCurrentGroup: action.payload,
      }
    }

    case LessonActionTypes.ADD_DELETED_PAGE: {
      return {
        ...state,
        deletedPages: [...state.deletedPages, action.payload],
      }
    }

    default:
      return state
  }
}

export default reducer
