import React from 'react'
import ReactDOM from 'react-dom'

import Crossroad from './Crossroad'

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
    choices: { edges: [] },
    id: 'SOME_ID',
    text
  }
  ReactDOM.render(
    <Crossroad {...props} />,
    div
  )
})
