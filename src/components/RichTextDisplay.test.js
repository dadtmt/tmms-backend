import React from 'react'
import ReactDOM from 'react-dom'

import RichTextDisplay from './RichTextDisplay'

it('renders without crashing', () => {
  const props = {
    rawContent: {
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
  }
  const div = document.createElement('div')
  ReactDOM.render(
    <RichTextDisplay {...props} />,
    div
  )
})
