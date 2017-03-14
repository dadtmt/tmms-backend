import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createStore, combineReducers } from 'redux'

import sheetSelector from '../reducers/sheetSelector'
import SheetSelectorWithData, {
  getSheetsFromData,
  getSheetByIdFromData
} from './SheetSelectorWithData'

/*eslint-disable*/
const data = {
  'variables': {
    'pageEditorId': 'UGFnZUVkaXRvcjox'
  },
  'loading': false,
  'networkStatus': 7,
  'viewer': {
    'user': {
      'editors': {
        'edges': [
          {
            'node': {
              'id': 'UGFnZUVkaXRvcjox',
              'sheets': {
                'edges': [
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
                ],
                '__typename': 'SheetsConnection'
              },
              '__typename': 'PageEditor'
            },
            '__typename': 'UserEditorsEdge'
          }
        ],
        '__typename': 'UserEditorsConnection'
      },
      '__typename': 'User'
    },
    '__typename': 'Viewer'
  }
}

/*eslint-enable*/

describe('getSheetsFromData', () => {
  it('should get sheets', () => {
    expect(getSheetsFromData(data)).toMatchSnapshot()
  })
})

describe('getSheetByIdFromData', () => {
  it('should get sheets', () => {
    expect(getSheetByIdFromData('id_2')(data)).toMatchSnapshot()
  })
})

const store = createStore(combineReducers({ sheetSelector }))
const client = new ApolloClient()

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <ApolloProvider client={client} store={store} >
      <SheetSelectorWithData />
    </ApolloProvider>,
    div
  )
})

it('renders correctly', () => {
  expect(
    renderer.create(<ApolloProvider client={client} store={store} >
      <SheetSelectorWithData />
    </ApolloProvider>).toJSON()
  ).toMatchSnapshot()
})
