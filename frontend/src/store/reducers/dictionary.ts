import { DictionaryAction, DictionaryActionTypes, DictionaryState } from '../types/dictionary'

const initialState: DictionaryState = {
  userWords: [],
  deletedWords: [],
  difficultWords: [],
  learnedWords: [],
  userWordsMode: 'learned',
  isLoading: false,
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
        isLoading: true,
      }
    }

    case DictionaryActionTypes.REQUESTED_USER_WORDS_SUCCESSED: {
      return {
        ...state,
        isLoading: false,
        userWords: action.payload.userWords,
        deletedWords: action.payload.deletedWords,
        difficultWords: action.payload.difficultWords,
        learnedWords: action.payload.learnedWords,
      }
    }

    case DictionaryActionTypes.REQUESTED_USER_WORDS_FAILED: {
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
