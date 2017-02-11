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
      reducer({ currentPage: null }, action)
    ).toMatchSnapshot()
  })
})

describe('createChoice mutation result', () => {
  it('add choice to page choices', () => {
    const action = {
      operationName: 'CreateChoice',
      result: {
        data: {
          createChoice: {
            changedChoice: {
              id: 'SOME_CHOICE_ID',
              text: 'choice text'
            }
          }
        }
      },
      type: 'APOLLO_MUTATION_RESULT'
    }
    expect(
      reducer({ currentPage: { id: 'SOME_PAGE_ID' } }, action)
    ).toMatchSnapshot()
  })
})
