import * as React from 'react'
import NoteController from './note/NoteController'
import NoteProvider from './context/NoteContext'
import NoteList from './note/NoteList'

const Notebook = () => (
  <NoteProvider>
    <NoteController />
    <NoteList />
  </NoteProvider>
)

export default Notebook
