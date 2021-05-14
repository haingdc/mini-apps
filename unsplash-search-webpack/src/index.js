import React                                      from 'react'
import ReactDOM                                   from 'react-dom'
import List                                       from './app'
import './style.css'

ReactDOM.render(
  React.createElement(List),
  document.querySelector('#fruit-list')
)