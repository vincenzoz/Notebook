import * as React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Item } from '../../../shared/models/Item'
import NoteService from '../../services/NoteService'
import { updateNotes } from '../../store/notebookSlice'
import { RootState, useAppDispatch } from '../../store/store'
import backToLogin from '../handler/routeHandler'
import ItemComponent from './Item'
import './note.scss'

const NoteList = () => {
  let initNoteList: Item[] = []
  const history = useHistory()
  const dispatch = useAppDispatch()
  const state = useSelector((state: RootState) => state)
  useEffect(() => {
    const { user } = state.auth
    if (!user) {
      backToLogin(history)
    }
    NoteService.retrieveNotesForUser(user)
      .then((res) => {
        initNoteList = res.notes
        dispatch(updateNotes(initNoteList))
      })
      .catch(() => backToLogin(history))
  }, [])

  return (
    <div className="item-list-container">
      <table className="item-list-table">
        <tbody>
          {
            state.notebook.notes.map((item: Item) => (
              <ItemComponent
                item={item}
                key={item.description}
                id={item.description}
              />
            ))
                }
        </tbody>
      </table>
    </div>
  )
}

export default NoteList
