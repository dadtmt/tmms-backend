import React from 'react'
import ReactDOM from 'react-dom'

import Choice from './Choice'

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
    id: 'SOME_ID',
    made: false,
    text
  }
  ReactDOM.render(
    <Choice {...props} />,
    div
  )
})
