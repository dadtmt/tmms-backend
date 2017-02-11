import React from 'react'
import ReactDOM from 'react-dom'
import ChoiceEditor from './ChoiceEditor'

const handleSave = jest.fn()

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ChoiceEditor handleSave={handleSave} />, div)
})
