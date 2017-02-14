import React from 'react'
import ReactDOM from 'react-dom'

import Choice from './Choice'

it('renders without crashing', () => {
  // eslint-disable-next-line max-len
  const text = '{"entityMap":{},"blocks":[{"key":"4bkmd","text":"some rich text","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'
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
