import { GameState, GameAction, GameActionTypes } from '../types/game'

const initialState: GameState = {
  level: 1,
}

const reducer = (state: GameState = initialState, action: GameAction): GameState => {
  switch (action.type) {
    case GameActionTypes.LEVEL_GAME: {
      return {
        ...state,
        level: action.payload,
      }
    }
    default:
      return state
  }
}

export default reducer
