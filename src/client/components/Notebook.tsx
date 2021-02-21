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
  const [noteListUpdated, updateNoteList] = React.useState<Item[]>([]);
  const [note, setNote] = useState<Item>({description: '', isStrikethrough: false});

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
      <div className="container">
        <div className="row mt-1">
        <div className="d-inline mr-1">
          <button className="btn btn-success btn-success btn-circle btn-xl" onClick={storeNotes}>
            <FontAwesomeIcon icon={['far', 'save']} />
          </button>
        </div>
        <div className="d-inline">
          <button className="btn btn-success btn-danger btn-circle btn-xl" onClick={deleteNotes}>
            <FontAwesomeIcon icon={['far', 'trash-alt']} />
          </button>
        </div>
        <div className="d-inline mr-1">
          <InputGroup>
            <FormControl aria-describedby="basic-addon2" value={note.description} onChange={(e: React.FormEvent<HTMLInputElement>) => setNote({description: e.currentTarget.value})}/>
          </InputGroup>
        </div>
        <div className="d-inline mr-1">
          <button onClick={addNote} className="btn btn-primary btn-circle btn-xl">
            <FontAwesomeIcon icon={['fas', 'plus']} />
          </button>
        </div>
        </div>
      </div>
     </div>
    <NoteList noteListUpdated={noteListUpdated}/>
  </div>)
}
export default Notebook