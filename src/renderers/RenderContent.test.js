import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import RenderContent from './RenderContent'

it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(
    <RenderContent />,
    div
  )
})

it('renders dice if dice type', () => {
  const props = {
    details: 'details',
    made: false,
    master: false,
    modifier: 0,
    nbDices: 1,
    nbSides: 6,
    result: 6,
    type: 'dice'
  }
  expect(
    renderer.create(<RenderContent {...props} />).toJSON()
  ).toMatchSnapshot()
})

it('renders empty div on unknown type', () => {
  const props = {
    type: 'unknown'
  }
  expect(
    renderer.create(<RenderContent {...props} />).toJSON()
  ).toMatchSnapshot()
})
