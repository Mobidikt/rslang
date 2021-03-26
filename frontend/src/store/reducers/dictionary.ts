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
      const words = action.payload

      const deletedWords = words.filter((word) => word.userWord.difficulty === 'deleted')
      const difficultWords = words.filter((word) => word.userWord.difficulty === 'difficult')
      const learnedWords = words.filter(
        (word) => word.userWord.difficulty === 'learned' || 'difficult',
      )
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

    default:
      return state
  }
}

export default reducer
