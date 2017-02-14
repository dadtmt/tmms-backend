import React from 'react'
import ReactDOM from 'react-dom'

import PageChoices from './PageChoices'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    choices: { edges: [] }
  }
  ReactDOM.render(
    <PageChoices {...props} />,
    div
  )
})
