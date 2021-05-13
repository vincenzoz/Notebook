import * as React from 'react'
import { render } from 'react-dom'
import './public/style.scss'
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
