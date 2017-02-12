import { makeProps, reducer } from './CurrentPageWithData'

describe('makeProps', () => {
  it('return empty currentpage on loading', () => {
    const data = { loading: true }
    expect(makeProps(data)).toMatchSnapshot()
  })
  it('return empty currentpage when no currentPage', () => {
    const data = {
      getPageEditor: {
        currentPage: null
      },
      loading: false
    }
    expect(makeProps(data)).toMatchSnapshot()
  })
  it('return currentpage', () => {
    const data = {
      getPageEditor: {
        currentPage: {
          choices: {
            edges: []
          },
          id: 'UGFnZTo3NQ==',
          text: 'some text'
        },
        id: 'UGFnZUVkaXRvcjoy'
      },
      loading: false
    }
    expect(makeProps(data)).toMatchSnapshot()
  })
})

describe('reducer', () => {
  it('update currentPage on createPage mutation', () => {
    const action = {
      operationName: 'CreatePage',
      result: {
        data: {
          createPage: {
            changedPage: {
              choices: {
                edges: []
              },
              id: 'SOME_ID',
              text: 'some text'
            }
          }
        }
      },
      type: 'APOLLO_MUTATION_RESULT'
    }
    const state = {
      getPageEditor: {
        currentPage: {
          choices: {
            edges: []
          }
        }
      }
    }
    expect(
      reducer(state, action)
    ).toMatchSnapshot()
  })
})
