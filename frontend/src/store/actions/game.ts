import { GameActionTypes, GameAction } from '../types/game'

const setLevelGame = (level: number): GameAction => ({
  type: GameActionTypes.LEVEL_GAME,
  payload: level,
})

const setIsMute = (): GameAction => ({
  type: GameActionTypes.SET_IS_MUTE,
})

export default {
  setLevelGame,
  setIsMute,
}
