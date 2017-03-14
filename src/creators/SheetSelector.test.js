import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import SheetSelector from './SheetSelector'

/*eslint-disable*/
const sheets = [
  {
    'node': {
      'id': 'id_1',
      'charateristics': null,
      'description': 'sdfsdf',
      'image': 'dsfdf',
      'inventory': null,
      'isPlayer': true,
      'name': 'Jojo le first',
      '__typename': 'Sheets'
    },
    '__typename': 'SheetsEdge'
  },
  {
    'node': {
      'id': 'id_2',
      'charateristics': null,
      'description': null,
      'image': null,
      'inventory': null,
      'isPlayer': false,
      'name': 'toto',
      '__typename': 'Sheets'
    },
    '__typename': 'SheetsEdge'
  }
]

/*eslint-enable*/

const props = {
  selectSheet: jest.fn(),
  selectedSheet: { name: 'new character' },
  sheets
}

const client = new ApolloClient()

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <ApolloProvider client={client} >
      <SheetSelector {...props} />
    </ApolloProvider>,
    div
  )
})

it('renders correctly', () => {
  expect(
    renderer.create(<ApolloProvider client={client}>
      <SheetSelector {...props} />
    </ApolloProvider>).toJSON()
  ).toMatchSnapshot()
})
