import { LessonAction, LessonState, LessonActionTypes } from '../types/lesson'

const getCurrentPageFromLocalStorage = (): number => {
  const currentPage = localStorage.getItem('currentPage')

  if (currentPage) {
    return typeof +currentPage === 'number' ? +currentPage : 0
  }

  return 0
}

const getVisibleStateFromLocalStorage = (name: string): boolean => {
  const status = localStorage.getItem(name)
  if (status === 'false') return false
  return true
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
    { title: 'lesson_1', color: '#E9FF70' },
    { title: 'lesson_2', color: '#FFD670' },
    { title: 'lesson_3', color: '#FF9770' },
    { title: 'lesson_4', color: '#FF70A6' },
    { title: 'lesson_5', color: '#70D6FF' },
    { title: 'lesson_6', color: '#C1FF9B' },
  ],
  currentGroup: null,
  currentPage: getCurrentPageFromLocalStorage(),
  currentWord: null,
  currentWordIsDifficult: false,
  isLoading: false,
  error: null,
  fromCurrentGroup: false,
  deletedPages: [],
  firstPage: 0,
  isDeleteBtnVisible: getVisibleStateFromLocalStorage('isDeleteBtnVisible'),
  isDifficultBtnVisible: getVisibleStateFromLocalStorage('isDifficultBtnVisible'),
  isTranslationSentenceVisible: getVisibleStateFromLocalStorage('isTranslationSentenceVisible'),
  isTranslationWordVisible: getVisibleStateFromLocalStorage('isTranslationWordVisible'),
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

    case LessonActionTypes.SET_FIRST_PAGE: {
      return {
        ...state,
        firstPage: action.payload,
      }
    }

    case LessonActionTypes.DELETE_DELETED_PAGE: {
      const newDeletedPages = state.deletedPages.filter((page) => page !== action.payload)
      return {
        ...state,
        deletedPages: newDeletedPages,
      }
    }

    case LessonActionTypes.SET_IS_DELETE_BTN_VISIBLE: {
      localStorage.setItem('isDeleteBtnVisible', JSON.stringify(!state.isDeleteBtnVisible))
      return {
        ...state,
        isDeleteBtnVisible: !state.isDeleteBtnVisible,
      }
    }

    case LessonActionTypes.SET_IS_DIFFICULT_BTN_VISIBLE: {
      localStorage.setItem('isDifficultBtnVisible', JSON.stringify(!state.isDifficultBtnVisible))
      return {
        ...state,
        isDifficultBtnVisible: !state.isDifficultBtnVisible,
      }
    }

    case LessonActionTypes.SET_IS_TRANSLATION_SENTENCE_VISIBLE: {
      localStorage.setItem(
        'isTranslationSentenceVisible',
        JSON.stringify(!state.isTranslationSentenceVisible),
      )
      return {
        ...state,
        isTranslationSentenceVisible: !state.isTranslationSentenceVisible,
      }
    }

    case LessonActionTypes.SET_IS_TRANSLATION_WORD_VISIBLE: {
      localStorage.setItem(
        'isTranslationWordVisible',
        JSON.stringify(!state.isTranslationWordVisible),
      )
      return {
        ...state,
        isTranslationWordVisible: !state.isTranslationWordVisible,
      }
    }

    default:
      return state
  }
}

export default reducer
