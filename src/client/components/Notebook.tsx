import * as React from 'react'
import {
  Switch,
  Route,
  HashRouter,
} from 'react-router-dom'
import NoteController from './note/NoteController'
import NoteProvider from './context/NoteContext'
import NoteList from './note/NoteList'
import Login from './login/Login'

const Notebook = () => (
  <HashRouter>
    <div>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/list">
          <NoteProvider>
            <NoteController />
            <NoteList />
          </NoteProvider>
        </Route>
      </Switch>
    </div>
  </HashRouter>
)

export default Notebook
