import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import StoryFeedWithData from './StoryFeedWithData'

const client = new ApolloClient()


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <ApolloProvider client={client} >
      <StoryFeedWithData />
    </ApolloProvider>,
    div
  )
})