import React from 'react'
import ReactDOM from 'react-dom'
import CreateCrossroad from './CreateCrossroad'

const createCrossroad = jest.fn()

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <CreateCrossroad createCrossroad={createCrossroad} />,
    div
  )
})
