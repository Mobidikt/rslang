export interface GameState {
  level: number;
  isMute: boolean;
  countWordsGame: number;
}

export enum GameActionTypes {
  LEVEL_GAME = 'GAME/LEVEL_GAME',
  SET_IS_MUTE = 'GAME/SET_IS_MUTE',
  COUNT_WORDS_GAME = 'GAME/COUNT_WORDS_GAME',
}

export interface SetLevelGame {
  type: GameActionTypes.LEVEL_GAME;
  payload: number;
}

export interface SetCountWordsGame {
  type: GameActionTypes.COUNT_WORDS_GAME;
  payload: number;
}

interface SetIsMute {
  type: GameActionTypes.SET_IS_MUTE;
}

export type GameAction = SetLevelGame | SetIsMute | SetCountWordsGame
