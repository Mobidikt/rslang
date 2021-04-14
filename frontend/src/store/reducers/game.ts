import { GameState, GameAction, GameActionTypes } from '../types/game'

const getCountWordsInGameFromLocalStorage = () => {
  const wordsInGame = localStorage.getItem('countWordsInGame')
  if (wordsInGame) return +wordsInGame
  return 10
}

const initialState: GameState = {
  level: 1,
  isMute: false,
  countWordsGame: getCountWordsInGameFromLocalStorage(),
}

const reducer = (state: GameState = initialState, action: GameAction): GameState => {
  switch (action.type) {
    case GameActionTypes.LEVEL_GAME: {
      return {
        ...state,
        level: action.payload,
      }
    }

    case GameActionTypes.SET_IS_MUTE: {
      return {
        ...state,
        isMute: !state.isMute,
      }
    }

    case GameActionTypes.COUNT_WORDS_GAME: {
      localStorage.setItem('countWordsInGame', JSON.stringify(action.payload))
      return {
        ...state,
        countWordsGame: action.payload,
      }
    }
    default:
      return state
  }
}

export default reducer
