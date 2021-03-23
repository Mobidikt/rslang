import { combineReducers } from 'redux'
import lessonReducer from './lesson'

export const rootReducer = combineReducers({
  lessonReducer,
})

export type RootState = ReturnType<typeof rootReducer>
