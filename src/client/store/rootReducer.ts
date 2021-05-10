import { combineReducers } from '@reduxjs/toolkit'
import notebookReducer from './notebookSlice'
import authReducer from './authSlice'

const rootReducer = combineReducers({
  notebook: notebookReducer,
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer
