import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
})

export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store
