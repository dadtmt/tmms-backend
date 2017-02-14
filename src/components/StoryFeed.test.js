import React from 'react'
import ReactDOM from 'react-dom'

import StoryFeed from './StoryFeed'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    pages: []
  }
  ReactDOM.render(
    <StoryFeed {...props} />,
    div
  )
})
