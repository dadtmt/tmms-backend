import React from 'react'
import ReactDOM from 'react-dom'

import Crossroads from './Crossroads'

it('renders without crashing', () => {
  const div = document.createElement('div')
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
  const props = {
    crossroads: { edges: [{
      node: {
        choices: { edges: [] },
        createdAt: 'some date',
        id: 'SOME_ID',
        testDices: { edges: [] },
        text
      }
    }] },
    header: 'header'
  }
  ReactDOM.render(
    <Crossroads {...props} />,
    div
  )
})
