import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import Choice from './Choice'

const text = {
  blocks: [
    {
      data: {},
      depth: 0,
      entityRanges: [],
      inlineStyleRanges: [],
      key: '4bkmd',
      text: 'some rich text',
      type: 'unstyled'
    }
  ],
  entityMap: {}
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    id: 'SOME_ID',
    made: false,
    text
  }
  ReactDOM.render(
    <Choice {...props} />,
    div
  )
})

jest.mock('draft-js/lib/generateRandomKey', () => () => '123')

it('renders correctly with default type', () => {
  const props = {
    id: 'SOME_ID',
    made: false,
    text,
    type: 'default'
  }
  expect(
    renderer.create(<Choice {...props} />).toJSON()
  ).toMatchSnapshot()
})

it('renders correctly with dice type', () => {
  const props = {
    content: {
      details: 'details',
      master: false,
      modifier: 0,
      nbDices: 1,
      nbSides: 6,
      result: 6
    },
    id: 'SOME_ID',
    made: false,
    text,
    type: 'dice'
  }
  expect(
    renderer.create(<Choice {...props} />).toJSON()
  ).toMatchSnapshot()
})
