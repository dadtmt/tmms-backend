import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import Dice from './Dice'

const props = {
  onChange: jest.fn()
}

it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(
    <Dice {...props} />,
    div
  )
})

it('renders correctly', () => {
  expect(
    renderer.create(<Dice {...props} />).toJSON()
  ).toMatchSnapshot()
})
