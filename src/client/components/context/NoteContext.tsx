import { createContext, useEffect, useState } from 'react'
import * as React from 'react'
import { useHistory } from 'react-router-dom'
import NoteService from '../../services/NoteService'
import { Item } from '../../../shared/models/Item'
import backToLogin from '../handler/routeHandler'

export const NoteContext = createContext(null)

export type NoteContextType = {
    noteList: Item[],
    updateNoteList: Function
}

const { Provider } = NoteContext
const NoteProvider = ({ children, user }: any) => {
  const [noteList, setNoteList] = useState<Item[]>([])
  let initNoteList: Item[] = []
  const history = useHistory()

  useEffect(() => {
    if (!user) {
      backToLogin(history)
    }
    NoteService.retrieveNotesForUser(user.username)
      .then((res) => {
        initNoteList = res.notes
        setNoteList((initNoteList !== undefined) ? initNoteList : [])
      })
      .catch(() => backToLogin(history))
  }, [])

  return (
    <Provider
      value={{
        noteList,
        updateNoteList: (newNoteList: Item[]) => {
          setNoteList(newNoteList)
        },
      }}
    >
      {children}
    </Provider>
  )
}

NoteProvider.context = NoteContext

export default NoteProvider
