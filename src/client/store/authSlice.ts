import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  token?: string,
  user?: string,
}

const initialState = { isAuthenticated: false } as AuthState

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, { payload }: PayloadAction<any>) {
      state.isAuthenticated = true
      state.token = payload.token
      state.user = payload.username
    },
    logout(state) {
      state.isAuthenticated = false
      state.token = undefined
      state.user = undefined
    },
  },
})

export const { login, logout } = auth.actions
export default auth.reducer
