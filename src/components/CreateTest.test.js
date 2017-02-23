import React from 'react'
import ReactDOM from 'react-dom'
import CreateTest from './CreateTest'

const createTest = jest.fn()
const crossroadId = 'SOME_ID'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <CreateTest createTest={createTest} crossroadId={crossroadId} />,
    div
  )
})
