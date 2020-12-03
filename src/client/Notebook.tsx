import * as React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import './style.css'

export default class Notebook extends React.Component {
  
  render () {
    return (
      <div>
        <div id="inlined">
        <div id="child1" className="container">
          <div className="row">
          <InputGroup className="mb-3 col-sm-3 ">
            <InputGroup.Prepend>
              <Button variant="outline-secondary">Button</Button>
            </InputGroup.Prepend>
            <FormControl aria-describedby="basic-addon2" />
          </InputGroup>
          </div>
        </div>
        </div>
      </div>
      
    );
  }
}