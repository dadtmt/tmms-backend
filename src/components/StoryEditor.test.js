import React from 'react'
import ReactDOM from 'react-dom'

import StoryEditor, { isChoiceMade } from './StoryEditor'

describe('isChoiceMade', () => {
  it('return true if one choice is made', () => {
    const currentPage = {
      choices: { edges: [
        {
          node: {
            made: true
          }
        },
        {
          node: {
            made: false
          }
        }
      ] },
      id: '',
      text: ''
    }
    expect(isChoiceMade(currentPage)).toBe(true)
  })
  it('return true if one choice is made', () => {
    const currentPage = {
      choices: { edges: [] },
      id: '',
      text: ''
    }
    expect(isChoiceMade(currentPage)).toBe(false)
  })
  it('return true if one choice is made', () => {
    const currentPage = {
      choices: { edges: [
        {
          node: {
            made: false
          }
        },
        {
          node: {
            made: false
          }
        }
      ] },
      id: '',
      text: ''
    }
    expect(isChoiceMade(currentPage)).toBe(false)
  })
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    clearPageEditor: jest.fn(),
    createChoice: jest.fn(),
    createPage: jest.fn(),
    data: {}
  }
  ReactDOM.render(
    <StoryEditor {...props} />,
    div
  )
})
