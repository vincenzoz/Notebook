import axios from 'axios';
import * as React from 'react';
import { Component } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
// import { Button, FormControl, InputGroup } from 'react-bootstrap';
import './style.css'



class Notebook extends Component {
  
  constructor(props: any) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
  }
  
    handleClick() {
      console.log('Clicked')
      // axios.get('http://localhost:' + port + '/check').then(resp => console.log(resp.data))
      axios.get('/check').then(resp => console.log(resp.data))
   }

   render () {
    return (
      <div>
        <div id="inlined">
          <div className="container">
            <div className="row">
            <InputGroup className="mb-3 col-sm-3 ">
              <InputGroup.Prepend>
                <Button variant="outline-secondary" onClick={this.handleClick}>Button</Button>
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


export default Notebook