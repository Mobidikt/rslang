import reducer from './auth'
import authActions from '../actions/auth'
import { AuthState } from '../types/auth'

describe('auth reducer test', () => {
  const state: AuthState = {
    userPhoto: null,
    username: null,
    token: null,
    isLoading: false,
    isLoginError: false,
    isRegistrationError: false,
    errorMessage: null,
    isVisibleAuthCard: false,
    isVisibleProfile: false,
    isRegistrated: false,
    email: null,
    userId: null,
  }

  it('requestedLogin action set isLoging equal true', () => {
    const action = authActions.requestedLogin()
    const newState = reducer(state, action)
    expect(newState.isLoading).toBeTruthy()
  })

  it('requestedLoginFailed action change isLoging to false and isLogingError to true', () => {
    const action = authActions.requestedLoginFailed('error')
    const newState = reducer(state, action)
    expect(newState).toStrictEqual({
      ...state,
      isLoading: false,
      isLoginError: true,
      errorMessage: 'error',
    })
  })

  it('setIsVisibleAuthCard action change isVisibleAuthCard on opposite value', () => {
    const action = authActions.setIsVisibleAuthCard()
    const newState = reducer(state, action)
    expect(newState.isVisibleAuthCard).toBeTruthy()
  })

  it('setIsVisibleProfileCard action set isVisibleProfile equal true', () => {
    const action = authActions.setIsVisibleProfileCard()
    const newState = reducer(state, action)
    expect(newState.isVisibleProfile).toBeTruthy()
  })

  it('setIsVisibleProfileCard action set isVisibleProfile equal false', () => {
    const action = authActions.setIsVisibleProfileCard(false)
    const newState = reducer(state, action)
    expect(newState.isVisibleProfile).toBeFalsy()
  })
})
