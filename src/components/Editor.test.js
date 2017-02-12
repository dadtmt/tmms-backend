import R from 'ramda'

const isChoiceMade = R.pipe(
  R.path(['choices', 'edges']),
  R.map(R.path(['node', 'made'])),
  R.reduce(
    R.or,
    false
  )
)

describe('isChoiceMade', () => {
  it('return true if one choice is made', () => {
    const currentPage = {
      choices: { edges: [
        {
          node: {
            made: true
          }
        },
        {
          node: {
            made: false
          }
        }
      ] },
      id: '',
      text: ''
    }
    expect(isChoiceMade(currentPage)).toBe(true)
  })
  it('return true if one choice is made', () => {
    const currentPage = {
      choices: { edges: [] },
      id: '',
      text: ''
    }
    expect(isChoiceMade(currentPage)).toBe(false)
  })
  it('return true if one choice is made', () => {
    const currentPage = {
      choices: { edges: [
        {
          node: {
            made: false
          }
        },
        {
          node: {
            made: false
          }
        }
      ] },
      id: '',
      text: ''
    }
    expect(isChoiceMade(currentPage)).toBe(false)
  })
})
