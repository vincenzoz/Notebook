import * as React from 'react'
import { useState } from 'react'
import {
  Switch,
  Route,
  HashRouter,
} from 'react-router-dom'
import axios from 'axios'
import NoteController from './note/NoteController'
import NoteProvider from './context/NoteContext'
import NoteList from './note/NoteList'
import Login from './login/Login'
import useToken from './useToken'
import { User } from '../../shared/models/User'

axios.interceptors.request.use((req) => {
  const tokenString = sessionStorage.getItem('token')
  req.headers.authorization = `bearer ${tokenString}`
  return req
})

const Notebook = () => {
  const { token, setToken } = useToken()
  const [user, setUser] = useState<User>()

  function LoginRender() {
    return (
      <Route path="/">
        <Login setToken={setToken} setUser={setUser} />
      </Route>
    )
  }

  function AppRender() {
    return (
      <Switch>
        <Route path="/list">
          <NoteProvider user={user}>
            <NoteController user={user} />
            <NoteList />
          </NoteProvider>
        </Route>
      </Switch>
    )
  }

  return (
    <div>
      <HashRouter>
        {
        (!token) ? LoginRender() : AppRender()
        }
      </HashRouter>
    </div>
  )
}

export default Notebook
