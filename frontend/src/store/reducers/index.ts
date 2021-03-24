import { combineReducers } from 'redux'
import lessonReducer from './lesson'
import authReducer from './auth'

export const rootReducer = combineReducers({
  lessonReducer,
  authReducer,
})

export type RootState = ReturnType<typeof rootReducer>
