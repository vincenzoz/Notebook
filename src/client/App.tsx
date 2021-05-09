import * as React from 'react'
import { render } from 'react-dom'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './public/style.css'
import { Provider } from 'react-redux'
import Notebook from './components/Notebook'
import './utility/fontawesome'
import store from './store/store'

render(
  <Provider store={store}>
    <Notebook />
  </Provider>,
  document.getElementById('root'),
)
