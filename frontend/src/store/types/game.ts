export interface GameState {
  level: number;
}

export enum GameActionTypes {
  LEVEL_GAME = 1,
}

export interface SetLevelGame {
  type: GameActionTypes.LEVEL_GAME;
  payload: number;
}

export type GameAction = SetLevelGame
