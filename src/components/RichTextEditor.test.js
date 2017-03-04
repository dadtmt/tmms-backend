import React from 'react'
import ReactDOM from 'react-dom'

import RichTextEditor from './RichTextEditor'

const props = { handleSave: jest.fn() }

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<RichTextEditor {...props} />, div)
})
