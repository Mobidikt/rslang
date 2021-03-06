import { combineReducers } from 'redux'
import lessonReducer from './lesson'
import authReducer from './auth'
import appReducer from './app'
import dictionaryReducer from './dictionary'
import gameReducer from './game'

export const rootReducer = combineReducers({
  lessonReducer,
  authReducer,
  appReducer,
  dictionaryReducer,
  gameReducer,
})

export type RootState = ReturnType<typeof rootReducer>
