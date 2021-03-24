import { combineReducers } from 'redux'
import lessonReducer from './lesson'
import authReducer from './auth'
import appReducer from './app'

export const rootReducer = combineReducers({
  lessonReducer,
  authReducer,
  appReducer,
})

export type RootState = ReturnType<typeof rootReducer>
