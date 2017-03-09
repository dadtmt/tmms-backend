import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import RenderCreator from './RenderCreator'

it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(
    <RenderCreator />,
    div
  )
})

it('renders dice if dice type', () => {
  const props = {
    onChange: jest.fn(),
    type: 'dice'
  }
  expect(
    renderer.create(<RenderCreator {...props} />).toJSON()
  ).toMatchSnapshot()
})

it('renders empty div on unknown type', () => {
  const props = {
    type: 'unknown'
  }
  expect(
    renderer.create(<RenderCreator {...props} />).toJSON()
  ).toMatchSnapshot()
})
