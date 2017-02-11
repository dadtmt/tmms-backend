import R from 'ramda'
import { createReducer } from './makeReducer'

const mutationHandlers = {
  CreateChoice: (state, action) => R.over(
    R.lensPath(['currentPage', 'choices']),
    R.append(
      R.path(['result', 'data', 'createChoice', 'changedChoice'], action)
    )
  )(state),
  CreatePage: (state, action) => R.assocPath(
    ['currentPage', 'id'],
    R.path(['result', 'data', 'createPage', 'changedPage', 'id'], action),
    state
  )
}

const handlers = {
  APOLLO_MUTATION_RESULT: (state, action) => R.propOr(
    R.identity,
    action.operationName,
    mutationHandlers
  )(state, action)
}

const editor = createReducer(
  {
    currentPage: {
      choices: [],
      id: ''
    }
  },
  handlers
)

export default editor
