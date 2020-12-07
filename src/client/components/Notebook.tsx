import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import NoteService from '../services/NoteService';


const Notebook = () =>{
  const noteService = new NoteService()
  
  const initNoteList :string[] = []
  const [noteListUpdated, updateNoteList] = React.useState(initNoteList);
  const [note, setNote] = useState("");

  function addNote() {
    noteListUpdated.push(note)
    updateNoteList(noteListUpdated)
    setNote('')
 }
  
  return (<div>
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
          <button className="btn btn-success btn-circle btn-xl" onClick={() => noteService.addNote(noteListUpdated)}>
            <FontAwesomeIcon icon={['far', 'save']} />
          </button>
        </div>
        </div>
      </div>
      <div>
        <ul>
          {noteListUpdated.map((note) => {
            return <li className='note-item' key={note}> {note}</li>
          }) }
        </ul>
      </div>
     </div>

  </div>)
}
export default Notebook