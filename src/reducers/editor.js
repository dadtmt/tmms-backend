import R from 'ramda'
import { createReducer } from './makeReducer'

const mutationHandlers = {
  CreatePage: (state, action) => R.assoc(
    'currentPageId',
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

const editor = createReducer({ currentPageId: null }, handlers)

export default editor
