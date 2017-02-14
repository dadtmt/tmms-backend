import React from 'react'
import ReactDOM from 'react-dom'

import RichTextDisplay from './RichTextDisplay'

it('renders without crashing', () => {
  const props = {
    // eslint-disable-next-line max-len
    rawContent: '{"entityMap":{},"blocks":[{"key":"4bkmd","text":"some rich text","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'
  }
  const div = document.createElement('div')
  ReactDOM.render(
    <RichTextDisplay {...props} />,
    div
  )
})
