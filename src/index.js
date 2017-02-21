import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'

import makeApolloClient from './makeApolloClient'
import editor from './reducers/editor'
import App from './App'

import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const client = makeApolloClient()

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
