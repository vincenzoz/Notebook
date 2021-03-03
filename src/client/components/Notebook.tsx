import * as React from 'react';
import NoteController from './NoteController';
import NoteProvider from './context/NoteContext';
import NoteList from './NoteList';

const Notebook = () =>{

 return (
  <div>
    <NoteProvider>
      <NoteController />
      <NoteList />
    </NoteProvider>
  </div>)
}
export default Notebook