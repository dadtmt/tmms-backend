import React from 'react'
import ReactDOM from 'react-dom'

import Crossroads from './Crossroads'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    crossroads: { edges: [] }
  }
  ReactDOM.render(
    <Crossroads {...props} />,
    div
  )
})
