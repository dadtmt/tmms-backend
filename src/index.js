import ApolloClient, { createNetworkInterface } from 'apollo-client'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://us-west-2.api.scaphold.io/graphql/tmms'
  })
})

ReactDOM.render(
  <ApolloProvider client={client} ><App /></ApolloProvider>,
  document.getElementById('root')
)
