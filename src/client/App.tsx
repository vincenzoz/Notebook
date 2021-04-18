import * as React from 'react'
import { render } from 'react-dom'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './public/style.css'
import Notebook from './components/Notebook'
import './utility/fontawesome'

render(<Notebook />, document.getElementById('root'))
