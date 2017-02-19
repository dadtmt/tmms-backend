import React from 'react'
import ReactDOM from 'react-dom'
import CreateChoice from './CreateChoice'

const createChoice = jest.fn()
const crossroadId = 'SOME_ID'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <CreateChoice createChoice={createChoice} crossroadId={crossroadId} />,
    div
  )
})
