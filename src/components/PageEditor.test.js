import React from 'react'
import ReactDOM from 'react-dom'
import PageEditor from './PageEditor'

const handleSave = jest.fn()

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<PageEditor handleSave={handleSave} />, div)
})
