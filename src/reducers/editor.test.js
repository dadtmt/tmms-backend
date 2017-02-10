import reducer from './editor'

describe('createPage mutation result', () => {
  it('set page id', () => {
    const action = {
      operationName: 'CreatePage',
      result: {
        data: {
          createPage: {
            changedPage: {
              id: 'SOME_ID'
            }
          }
        }
      },
      type: 'APOLLO_MUTATION_RESULT'
    }
    expect(
      reducer({ currentPageId: null }, action)
    ).toMatchSnapshot()
  })
})

describe('editor reducer', () => {
  it('return initialState on some action', () => {
    expect(
      reducer({ currentPageId: null }, { type: 'SOME_ACTION' })
    ).toMatchSnapshot()
  })
})
