import React from 'react'
import ReactDOM from 'react-dom'

import TestDice from './TestDice'

it('renders without crashing', () => {
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
  const div = document.createElement('div')
  const props = {
    details: 'details',
    id: 'SOME_ID',
    made: false,
    modifier: 0,
    nbDices: 1,
    nbSides: 6,
    result: 6,
    text
  }
  ReactDOM.render(
    <TestDice {...props} />,
    div
  )
})
