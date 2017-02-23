import React from 'react'
import ReactDOM from 'react-dom'

import TestDices from './TestDices'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    testDices: { edges: [] }
  }
  ReactDOM.render(
    <TestDices {...props} />,
    div
  )
})
