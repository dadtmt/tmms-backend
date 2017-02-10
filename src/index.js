import ApolloClient, { createNetworkInterface } from 'apollo-client'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'

import editor from './reducers/editor'
import App from './App'

import './index.css'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://us-west-2.api.scaphold.io/graphql/tmms'
  })
})

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    editor
  }),
  {},
  compose(
      applyMiddleware(client.middleware()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

ReactDOM.render(
  <ApolloProvider client={client} store={store} ><App /></ApolloProvider>,
  document.getElementById('root')
)
