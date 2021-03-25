import { combineReducers } from 'redux'
import lessonReducer from './lesson'
import authReducer from './auth'
import appReducer from './app'
import dictionaryReducer from './dictionary'

export const rootReducer = combineReducers({
  lessonReducer,
  authReducer,
  appReducer,
  dictionaryReducer,
})

export type RootState = ReturnType<typeof rootReducer>
