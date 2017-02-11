import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { combineReducers, createStore } from 'redux'

import editor from './reducers/editor'
import App from './App'

const client = new ApolloClient()

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    editor
  })
)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <ApolloProvider client={client} store={store} ><App /></ApolloProvider>,
    div
  )
})
