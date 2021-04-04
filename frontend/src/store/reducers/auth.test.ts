import reducer from './auth'
import authActions from '../actions/auth'
import {AuthState} from '../types/auth';


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
    let action = authActions.requestedLogin()
    let newState = reducer(state, action)
    expect(newState.isLoading).toBeTruthy()
  })

  it('requestedLoginFailed action change isLoging to false and isLogingError to true', () => {
    let action = authActions.requestedLoginFailed('error')
    let newState = reducer(state, action)
    expect(newState).toStrictEqual({...state, isLoading: false, isLoginError: true, errorMessage: 'error'})
  })

  it('setIsVisibleAuthCard action change isVisibleAuthCard on opposite value', () => {
    let action = authActions.setIsVisibleAuthCard()
    let newState = reducer(state, action)
    expect(newState.isVisibleAuthCard).toBeTruthy()
  })

  it('setIsVisibleProfileCard action set isVisibleProfile equal true', () => {
    let action = authActions.setIsVisibleProfileCard()
    let newState = reducer(state, action)
    expect(newState.isVisibleProfile).toBeTruthy()
  })

  it('setIsVisibleProfileCard action set isVisibleProfile equal false', () => {
    let action = authActions.setIsVisibleProfileCard(false)
    let newState = reducer(state, action)
    expect(newState.isVisibleProfile).toBeFalsy()
  })

})