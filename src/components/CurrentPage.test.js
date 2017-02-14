import React from 'react'
import ReactDOM from 'react-dom'

import CurrentPage from './CurrentPage'

it('renders without crashing', () => {
  // eslint-disable-next-line max-len
  const text = '{"entityMap":{},"blocks":[{"key":"4bkmd","text":"some rich text","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'
  const div = document.createElement('div')
  const props = {
    choices: { edges: [] },
    createChoice: jest.fn(),
    createPage: jest.fn(),
    id: 'SOME_ID',
    text
  }
  ReactDOM.render(
    <CurrentPage {...props} />,
    div
  )
})
