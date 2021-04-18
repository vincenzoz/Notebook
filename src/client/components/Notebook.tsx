import * as React from 'react'
import NoteController from './NoteController'
import NoteProvider from './context/NoteContext'
import NoteList from './NoteList'

const Notebook = () => (
  <NoteProvider>
    <NoteController />
    <NoteList />
  </NoteProvider>
)

export default Notebook
