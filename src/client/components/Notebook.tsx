import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { Item } from '../../shared/models/Item';
import { Notes } from '../../shared/models/Notes';
import { User } from '../../shared/models/User';
import NoteService, { DeleteCount } from '../services/NoteService';
import getMockedUser from '../services/UserService';
import NoteList from './NoteList'
import alert, { alertConfig } from './../utility/alert'

const username = getMockedUser()['username']
let initNoteList :Item[] = []

const Notebook = () =>{
  // window.alert("width: " + screen.width)
  const [noteListUpdated, updateNoteList] = React.useState<Item[]>([]);
  const [note, setNote] = useState<Item>({description: '', isStrikethrough: false});

const typeNoteInput = React.useRef<HTMLInputElement>();

  useEffect(()=> {
    NoteService.retrieveNotesByUsername(username).then(res => {
      initNoteList = res.notes
      updateNoteList((initNoteList != undefined) ? initNoteList : [])
    })
  }, [])

  function addNote() {
    noteListUpdated.push(note)
    updateNoteList(noteListUpdated)
    setNote({description: '', isStrikethrough: false})
    typeNoteInput.current.focus()

 }

 function storeNotes() {
    if (noteListUpdated.length > 0) {
      const user: User = getMockedUser()
      const saveNoteRequest: Notes = {username: user.username, notes: noteListUpdated}
      NoteService.saveNotes(saveNoteRequest)
    } else {
      alert.showInfoAlert(alertConfig.saveNoteInfo)
    }
    
 } 
 
 function deleteNotes() {
  if (noteListUpdated.length > 0) {
    NoteService.deleteNotesByUsername(username).then(res => {
      if (res.deleteCount === DeleteCount.ONE)
        updateNoteList([])
    })
  } else {
    alert.showInfoAlert(alertConfig.deleteNoteInfo)
  }
 }

 return (
  <div>
    <div>
      <div className="bar-container">
        <div className="bar-elem">
          <button className="btn btn-success btn-success btn-circle btn-xl" onClick={storeNotes}>
            <FontAwesomeIcon icon={['far', 'save']} />
          </button>
        </div>
        <div className="bar-elem">
          <button className="btn btn-success btn-danger btn-circle btn-xl" onClick={deleteNotes}>
            <FontAwesomeIcon icon={['far', 'trash-alt']} />
          </button>
        </div>
        <div className="bar-elem full">
          <input ref={typeNoteInput} value={note.description} onChange={(e: React.FormEvent<HTMLInputElement>) => setNote({description: e.currentTarget.value})}/>  
        </div>
        <div className="bar-elem">
          <button onClick={addNote} className="btn btn-primary btn-circle btn-xl">
            <FontAwesomeIcon icon={['fas', 'plus']} />
          </button>
        </div>
      </div>
     </div>
    <NoteList noteListUpdated={noteListUpdated}/>
  </div>)
}
export default Notebook