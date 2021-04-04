import reducer from './game'
import { GameState } from '../types/game'
import gameActions from '../actions/game'


describe('game reducer test', () => {

  const state: GameState = {
    level: 1,
    isMute: false,
    countWordsGame: 10,
  }

  it('setLevel action save level in state', ()=>{
    let action = gameActions.setLevelGame(3)
    let newState = reducer(state, action)
    expect(newState.level).toBe(3)
  });

  it('SetCountWordsGame action save count in state', ()=>{
    let action = gameActions.SetCountWordsGame(5)
    let newState = reducer(state, action)
    expect(newState.countWordsGame).toBe(5)
  });

  it('setIsMute action change isMute on opposite value', ()=>{
    let action = gameActions.setIsMute()
    let newState = reducer(state, action)
    expect(newState.isMute).toBeTruthy()
  });

});
