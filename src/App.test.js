import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { combineReducers, createStore } from 'redux'
import { EventEmitter } from 'events'

import App from './App'

jest.mock('./utils/AuthService', () => class extends EventEmitter {
  getProfile() {}
  login() {}
  logout() {}
  loggedIn() {}
})

const client = new ApolloClient()

const store = createStore(
  combineReducers({
    apollo: client.reducer()
  })
)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <ApolloProvider client={client} store={store} ><App /></ApolloProvider>,
    div
  )
})
