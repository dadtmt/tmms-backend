import React from 'react'
import ReactDOM from 'react-dom'

import Choices from './Choices'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    choices: { edges: [] }
  }
  ReactDOM.render(
    <Choices {...props} />,
    div
  )
})
