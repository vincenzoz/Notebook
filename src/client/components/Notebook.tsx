import * as React from 'react';
import { useEffect } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import NoteService from '../services/NoteService';

const Notebook = () =>{
  const[count, setCount] = React.useState(0)
  const noteService = new NoteService()

  useEffect(() => {
    document.title = `You clicked ${count} times`
    return (() => {
      setTimeout(() => setCount(0), 3000)
    })
  })


  function handleClick() {
    console.log('Clicked')
    noteService.addNote()
 }
  
  return (<div>
    <div id="inlined">
      <div className="container">
        <div className="row">
        <InputGroup className="mb-3 col-sm-3 ">
          <InputGroup.Prepend>
            <Button variant="outline-secondary" onClick={handleClick}>Button</Button>
            <Button variant="outline-secondary" onClick={() => setCount(count + 1)}>Increment title counter</Button>
          </InputGroup.Prepend>
          <FormControl aria-describedby="basic-addon2" />
        </InputGroup>
        </div>
      </div>
     </div>

  </div>)
}
export default Notebook