import { DictionaryAction, DictionaryActionTypes, DictionaryState } from '../types/dictionary'

const initialState: DictionaryState = {
  userWords: [],
  deletedWords: [],
  difficultWords: [],
  learnedWords: [],
  userWordsMode: 'learned',
  isLoadingDictionary: false,
  error: null,
}

const reducer = (
  state: DictionaryState = initialState,
  action: DictionaryAction,
): DictionaryState => {
  switch (action.type) {
    case DictionaryActionTypes.REQUESTED_USER_WORDS: {
      return {
        ...state,
        isLoadingDictionary: true,
      }
    }

    case DictionaryActionTypes.REQUESTED_USER_WORDS_SUCCESSED: {
      return {
        ...state,
        isLoadingDictionary: false,
        userWords: action.payload,
      }
    }

    case DictionaryActionTypes.REQUESTED_USER_WORDS_FAILED: {
      return {
        ...state,
        isLoadingDictionary: false,
        error: action.payload,
      }
    }

    case DictionaryActionTypes.REQUESTED_ADD_WORD: {
      return {
        ...state,
        isLoadingDictionary: true,
      }
    }

    case DictionaryActionTypes.REQUESTED_ADD_WORD_SUCCESSED: {
      const newWord = action.payload
      return {
        ...state,
        isLoadingDictionary: false,
        learnedWords: [...state.learnedWords, newWord],
        difficultWords: [...state.difficultWords, newWord],
        userWords: [...state.userWords, newWord],
      }
    }

    case DictionaryActionTypes.REQUESTED_ADD_WORD_FAILED: {
      return {
        ...state,
        isLoadingDictionary: false,
        error: action.payload,
      }
    }

    case DictionaryActionTypes.GROUP_WORDS: {
      let deletedWords
      let difficultWords
      let learnedWords

      if (action.payload.length !== 0) {
        const words = action.payload
        deletedWords = words.filter((word) => word.userWord.difficulty === 'deleted')
        difficultWords = words.filter((word) => word.userWord.difficulty === 'difficult')
        learnedWords = words.filter((word) => word.userWord.difficulty !== 'deleted')
      } else {
        deletedWords = state.userWords.filter((word) => word.userWord.difficulty === 'deleted')
        difficultWords = state.userWords.filter((word) => word.userWord.difficulty === 'difficult')
        learnedWords = state.userWords.filter((word) => word.userWord.difficulty !== 'deleted')
      }

      return {
        ...state,
        deletedWords,
        difficultWords,
        learnedWords,
      }
    }

    case DictionaryActionTypes.CLEAR_USER_WORDS: {
      return {
        ...state,
        userWords: [],
        deletedWords: [],
        difficultWords: [],
        learnedWords: [],
      }
    }

    case DictionaryActionTypes.REQUESTED_UPDATE_USER_WORD: {
      return {
        ...state,
        isLoadingDictionary: true,
      }
    }

    case DictionaryActionTypes.REQUESTED_UPDATE_USER_WORD_SUCCESSED: {
      const updatedUserWord = action.payload
      const updatedUserWords = state.userWords.map((word) =>
        word._id === updatedUserWord._id ? updatedUserWord : word,
      )
      return {
        ...state,
        isLoadingDictionary: false,
        userWords: updatedUserWords,
      }
    }

    case DictionaryActionTypes.REQUESTED_UPDATE_USER_WORD_FAILED: {
      return {
        ...state,
        isLoadingDictionary: false,
        error: action.payload,
      }
    }

    default:
      return state
  }
}

export default reducer
