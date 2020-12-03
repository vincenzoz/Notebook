
import * as React from 'react'
import {render} from 'react-dom'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Notebook from './Notebook';
import axios from 'axios';




// render(<Notebook />, document.getElementById('root'));

// render(<button onClick={handleClick}>alert</button>, document.getElementById('root'));

class App extends React.Component {
    handleClick() {
        console.log('Finally')
      axios.get('http://localhost:5000/check').then(resp => console.log(resp.data))
     }

    render() {
        return (
            <div>
                <Notebook />
            </div>
        )
    }
    
    
}
render(<App/>, document.getElementById('root'));
