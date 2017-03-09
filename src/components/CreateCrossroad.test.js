import React from 'react'
import ReactDOM from 'react-dom'

import CreateCrossroad from './CreateCrossroad'

const props = {
  createCrossroad: jest.fn(),
  updateCrossroadText: jest.fn()
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <CreateCrossroad {...props} />,
    div
  )
})
