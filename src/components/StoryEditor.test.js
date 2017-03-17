import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'

import StoryEditor from './StoryEditor'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    clearPageEditor: jest.fn(),
    createChoice: jest.fn(),
    createCrossroad: jest.fn(),
    createTest: jest.fn(),
    data: {},
    deleteChoice: jest.fn(),
    toggleIsReady: jest.fn(),
    updateCrossroadText: jest.fn()
  }
  const client = new ApolloClient()
  ReactDOM.render(
    <ApolloProvider client={client}>
      <StoryEditor {...props} />
    </ApolloProvider>,
    div
  )
})
