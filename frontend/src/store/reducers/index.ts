import { combineReducers } from 'redux'
import lessonReducer from './lesson'
import authReducer from './auth'
import appReducer from './app'
import dictionaryReducer from './dictionary'
import gameReducer from './game'
import language from './language'

export const rootReducer = combineReducers({
  lessonReducer,
  authReducer,
  appReducer,
  dictionaryReducer,
  gameReducer,
  language,
})

export type RootState = ReturnType<typeof rootReducer>
