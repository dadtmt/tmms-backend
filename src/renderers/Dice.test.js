import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import Dice from './Dice'

const notResolvedprops = {
  made: false,
  master: false,
  modifier: 0,
  nbDices: 1,
  nbSides: 6
}

const props = {
  details: 'details',
  made: false,
  master: false,
  modifier: 0,
  nbDices: 1,
  nbSides: 6,
  result: 6
}

it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(
    <Dice {...props} />,
    div
  )

  ReactDOM.render(
    <Dice {...notResolvedprops} />,
    div
  )
})

it('renders hiding details and result when master and made false', () => {
  expect(
    renderer.create(<Dice {...props} />).toJSON()
  ).toMatchSnapshot()
})

it('renders showing details and result when master or made true', () => {
  expect(
    renderer.create(<Dice {...props} master={true} />).toJSON()
  ).toMatchSnapshot()
  expect(
    renderer.create(<Dice {...props} made={true} />).toJSON()
  ).toMatchSnapshot()
  expect(
    renderer.create(<Dice {...props} master={true} made={true} />).toJSON()
  ).toMatchSnapshot()
})
