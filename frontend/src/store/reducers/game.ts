import { GameState, GameAction, GameActionTypes } from '../types/game'

const initialState: GameState = {
  level: 1,
  isMute: false,
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
    default:
      return state
  }
}

export default reducer
