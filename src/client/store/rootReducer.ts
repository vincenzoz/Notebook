import { combineReducers } from '@reduxjs/toolkit'
import notebookReducer from './notebookSlice'

const rootReducer = combineReducers({
  notebook: notebookReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer
