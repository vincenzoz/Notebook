import * as React from 'react'
import {
  Switch,
  Route,
  HashRouter,
} from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import NoteController from './note/NoteController'
import NoteList from './note/NoteList'
import Login from './login/Login'
import { RootState } from '../store/rootReducer'
import store from '../store/store'

axios.interceptors.request.use((req) => {
  const { auth } = store.getState()
  if (auth.isAuthenticated) {
    const tokenString = auth.token
    req.headers.authorization = `bearer ${tokenString}`
  }
  return req
})

const Notebook = () => {
  const state = useSelector((state: RootState) => state)

  function LoginRender() {
    return (
      <Route path="/">
        <Login />
      </Route>
    )
  }

  function AppRender() {
    return (
      <Switch>
        <Route path="/list">
          <NoteController />
          <NoteList />
        </Route>
      </Switch>
    )
  }

  return (
    <div>
      <HashRouter>
        {
        (!state.auth.isAuthenticated) ? LoginRender() : AppRender()
        }
      </HashRouter>
    </div>
  )
}

export default Notebook
