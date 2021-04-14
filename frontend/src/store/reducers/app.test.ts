import reducer from './app'
import appActions from '../actions/app'
import { AppState } from '../types/app'

describe('app reducer test', () => {
  const state: AppState = {
    selectedSection: 'Rslang',
    headerColor: '#70D6FF',
  }

  it('setSelectedSection action save section in state', () => {
    const action = appActions.setSelectedSection('dictionary')
    const newState = reducer(state, action)
    expect(newState.selectedSection).toBe('dictionary')
  })

  it('setHeaderColor action save headerColor in state', () => {
    const action = appActions.setHeaderColor('white')
    const newState = reducer(state, action)
    expect(newState.headerColor).toBe('white')
  })
})
