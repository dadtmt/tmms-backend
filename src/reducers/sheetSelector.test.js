import reducer from './sheetSelector'

const initialState = {
  selectedSheet: {
    characteristics: [],
    inventory: [],
    name: 'type a name for this character'
  }
}

it('return initial state', () => {
  expect(reducer(
    initialState,
    {
      type: 'SOME_ACTION_TYPE'
    }
  )).toMatchSnapshot()
})

it('handles SELECT_SHEET', () => {
  expect(reducer(
    initialState,
    {
      sheet: {
        id: 'SOME_ID',
        name: 'Marom'
      },
      type: 'SELECT_SHEET'
    }
  )).toMatchSnapshot()
})

it('handles CREATE_SHEET_MUTATION', () => {
  expect(reducer(
    initialState,
    {
      operationName: 'CreateSheet',
      result: {
        data: {
          createSheets: {
            changedEdge: {
              node: {
                description: 'semi orc',
                id: 'SOME_ID',
                image: 'marom.png',
                isPlayer: true,
                name: 'Marom'
              }
            }
          }
        }
      },
      type: 'APOLLO_MUTATION_RESULT'
    }
  )).toMatchSnapshot()
})
