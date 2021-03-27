import { GameActionTypes, GameAction } from '../types/game'

const setLevelGame = (level: number): GameAction => ({
  type: GameActionTypes.LEVEL_GAME,
  payload: level,
})

export default {
  setLevelGame,
}
