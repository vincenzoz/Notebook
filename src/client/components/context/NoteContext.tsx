import { createContext, useEffect, useState } from 'react'
import * as React from 'react'
import NoteService from '../../services/NoteService'
import { getMockUser } from '../../services/UserService'
import { Item } from '../../../shared/models/Item'

export const NoteContext = createContext(null)

export type NoteContextType = {
    noteList: Item[],
    updateNoteList: Function
}

const { Provider } = NoteContext
const NoteProvider = ({ children }: any) => {
  const [noteList, setNoteList] = useState<Item[]>([])
  const { username } = getMockUser()
  let initNoteList: Item[] = []

  useEffect(() => {
    NoteService.retrieveNotesForUser(username).then((res) => {
      initNoteList = res.notes
      setNoteList((initNoteList !== undefined) ? initNoteList : [])
    })
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
