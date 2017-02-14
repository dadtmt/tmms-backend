import React from 'react'
import ReactDOM from 'react-dom'

import Page from './Page'

it('renders without crashing', () => {
  // eslint-disable-next-line max-len
  const text = '{"entityMap":{},"blocks":[{"key":"4bkmd","text":"some rich text","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'
  const div = document.createElement('div')
  const props = {
    choices: { edges: [] },
    id: 'SOME_ID',
    text
  }
  ReactDOM.render(
    <Page {...props} />,
    div
  )
})
