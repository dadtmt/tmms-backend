import React from 'react'
import renderer from 'react-test-renderer'
import { createStore, combineReducers } from 'redux'
import { reducer } from 'redux-form'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import CharacterSheet from './CharacterSheet'

const client = new ApolloClient()

const store = createStore(combineReducers({ form: reducer }))

it('renders correctly', () => {
  expect(
    renderer.create(<ApolloProvider client={client} store={store}>
      <CharacterSheet
        initialValues={{
          characs: [{
            name: 'Force',
            value: 4
          }],
          gear: [{
            count: 1,
            image: 'http://arc.png',
            name: 'Arc de feu'
          }],
          name: 'toto'
        }}
      />
    </ApolloProvider>).toJSON()
  ).toMatchSnapshot()
})
