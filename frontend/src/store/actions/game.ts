import { GameActionTypes, GameAction } from '../types/game'

const setLevelGame = (level: number): GameAction => ({
  type: GameActionTypes.LEVEL_GAME,
  payload: level,
})

const SetCountWordsGame = (count: number): GameAction => ({
  type: GameActionTypes.COUNT_WORDS_GAME,
  payload: count,
})

const setIsMute = (): GameAction => ({
  type: GameActionTypes.SET_IS_MUTE,
})

export default {
  setLevelGame,
  SetCountWordsGame,
  setIsMute,
}
