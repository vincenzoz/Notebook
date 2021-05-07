import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Item } from '../../../shared/models/Item'
import { Notes } from '../../../shared/models/Notes'
import { User } from '../../../shared/models/User'
import alert, { alertConfig } from '../../utility/alert'
import NoteService from '../../services/NoteService'
import { NoteContext, NoteContextType } from '../context/NoteContext'
import backToLogin from '../handler/routeHandler'

type ControllerProps = {
  user: User
}

const NoteController = ({ user } :ControllerProps) => {
  const EMPTY_NOTE: Item = { description: '', isStrikethrough: false }
  const noteContext: NoteContextType = React.useContext(NoteContext)
  const [note, setNote] = useState<Item>(EMPTY_NOTE)
  const typeNoteInput = React.useRef<HTMLInputElement>()
  const history = useHistory()

  function addNote() {
    const noteListClone: Item[] = [...noteContext.noteList]
    noteListClone.push(note)
    noteContext.updateNoteList(noteListClone)
    setNote(EMPTY_NOTE)
    typeNoteInput.current.focus()
  }

  function storeNotes() {
    if (noteContext.noteList.length > 0) {
      const saveNoteRequest: Notes = { username: user.username, notes: noteContext.noteList }
      NoteService.saveNotes(saveNoteRequest)
        .then(() => alert.showSuccessAlert(alertConfig.saveNoteSuccess))
        .catch(() => backToLogin(history))
    } else {
      alert.showInfoAlert(alertConfig.saveNoteInfo)
    }
  }

  function deleteNotes() {
    alert.showConfirmAlert(alertConfig.deleteNoteConfirm)
      .then((result) => {
        if (result.isConfirmed) {
          NoteService.deleteNotesForUser(user.username)
            .then(() => {
              alert.showSuccessAlert(alertConfig.deleteNoteSuccess)
              noteContext.updateNoteList([])
            })
        }
      })
  }

  function isNodeListEmpty() {
    return noteContext.noteList.length === 0
  }

  return (
    <NoteContext.Consumer>
      {() => (
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
      )}
    </NoteContext.Consumer>
  )
}

export default NoteController
