export interface GameState {
  level: number;
  isMute: boolean;
}

export enum GameActionTypes {
  LEVEL_GAME = 'GAME/LEVEL_GAME',
  SET_IS_MUTE = 'GAME/SET_IS_MUTE',
}

export interface SetLevelGame {
  type: GameActionTypes.LEVEL_GAME;
  payload: number;
}

interface SetIsMute {
  type: GameActionTypes.SET_IS_MUTE;
}

export type GameAction = SetLevelGame | SetIsMute
