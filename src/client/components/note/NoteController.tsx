import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Item } from '../../../shared/models/Item'
import { Notes } from '../../../shared/models/Notes'
import { User } from '../../../shared/models/User'
import alert, { alertConfig } from '../../utility/alert'
import NoteService from '../../services/NoteService'
import backToLogin from '../handler/routeHandler'
import { updateNotes } from '../../store/notebookSlice'
import { useAppDispatch } from '../../store/store'
import { RootState } from '../../store/rootReducer'
import { logout } from '../../store/authSlice'

const NoteController = () => {
  const EMPTY_NOTE: Item = { description: '', isSelected: false }
  const [note, setNote] = useState<Item>(EMPTY_NOTE)
  const typeNoteInput = React.useRef<HTMLInputElement>()
  const history = useHistory()
  const dispatch = useAppDispatch()
  const state = useSelector((state: RootState) => state)

  function addNote() {
    const { notes } = state.notebook
    const noteListClone: Item[] = [...notes]
    noteListClone.push(note)
    dispatch(updateNotes(noteListClone))
    setNote(EMPTY_NOTE)
    typeNoteInput.current.focus()
  }

  function storeNotes() {
    const { notes } = state.notebook
    if (notes.length > 0) {
      const saveNoteRequest: Notes = { username: state.auth.user, notes }
      NoteService.saveNotes(saveNoteRequest)
        .then(() => alert.showSuccessAlert(alertConfig.saveNoteSuccess))
        .catch(() => {
          alert.showInfoAlert(alertConfig.sessionHasExpired)
          dispatch(logout())
          backToLogin(history)
        })
    } else {
      alert.showInfoAlert(alertConfig.saveNoteInfo)
    }
  }

  function deleteNotes() {
    alert.showConfirmAlert(alertConfig.deleteNoteConfirm)
      .then((result) => {
        if (result.isConfirmed) {
          NoteService.deleteNotesForUser(state.auth.user)
            .then(() => {
              alert.showSuccessAlert(alertConfig.deleteNoteSuccess)
              dispatch(updateNotes([]))
            })
        }
      })
  }

  function isNodeListEmpty() {
    return state.notebook.notes.length === 0
  }

  return (
    <div>
      <div className="bar-container">
        <div className="bar-elem">
          <button
            className="btn btn-success btn-success btn-circle btn-xl"
            onClick={storeNotes}
            disabled={isNodeListEmpty()}
          >
            <FontAwesomeIcon icon={['far', 'save']} />
          </button>
        </div>
        <div className="bar-elem">
          <button className="btn btn-success btn-danger btn-circle btn-xl" onClick={deleteNotes} disabled={isNodeListEmpty()}>
            <FontAwesomeIcon icon={['far', 'trash-alt']} />
          </button>
        </div>
        <div className="bar-elem full">
          <input
            ref={typeNoteInput}
            value={note.description}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setNote(
              { description: e.currentTarget.value },
            )}
          />
        </div>
        <div className="bar-elem">
          <button onClick={addNote} className="btn btn-primary btn-circle btn-xl" disabled={note.description === ''}>
            <FontAwesomeIcon icon={['fas', 'plus']} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteController
