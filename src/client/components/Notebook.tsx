import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { Notes } from '../../shared/models/Notes';
import { User } from '../../shared/models/User';
import NoteService from '../services/NoteService';
import getMockedUser from '../services/UserService';

const username = getMockedUser()['username']
let initNoteList :string[] = []

const Notebook = () =>{
  const [noteListUpdated, updateNoteList] = React.useState([]);
  const [note, setNote] = useState("");

  useEffect(()=> {
    NoteService.retrieveNotesByUsername(username).then(res => {
      initNoteList = res.notes
      updateNoteList((initNoteList != undefined) ? initNoteList : [])
    })
  }, [])

  function addNote() {
    noteListUpdated.push(note)
    updateNoteList(noteListUpdated)
    setNote('')
 }

 function storeNotes() {
    const user: User = getMockedUser()
    const saveNoteRequest: Notes = {username: user.username, notes: noteListUpdated}
    NoteService.saveNotes(saveNoteRequest)
 }

 function showNoteList() {
   if (noteListUpdated != undefined) {
     return (
        <ul>
          {
            noteListUpdated.map((note) =>
              <li className='note-item' key={note}> {note}</li>
            )
          }
      </ul>
    )
   }
 }

  return (
  <div>
    <div>
      <div className="container">
        <div className="row mt-1">
        <div className="d-inline mr-1">
          <button onClick={addNote} className="btn btn-danger btn-circle btn-xl">
            <FontAwesomeIcon icon={['fas', 'plus']} />
          </button>
          </div>
        <div className="d-inline mr-1">
          <InputGroup>
            <FormControl aria-describedby="basic-addon2" value={note} onChange={(e: React.FormEvent<HTMLInputElement>) => setNote(e.currentTarget.value)}/>
          </InputGroup>
        </div>
        <div className="d-inline">
          <button className="btn btn-success btn-circle btn-xl" onClick={storeNotes}>
            <FontAwesomeIcon icon={['far', 'save']} />
          </button>
        </div>
        </div>
      </div>
      <div>
        {showNoteList()}
      </div>
     </div>

  </div>)
}
export default Notebook