import R from 'ramda'

import { createReducer } from './makeReducer'

const mutationHandlers = {
  CreateSheet: (state, { createSheets }) => R.assoc(
    'selectedSheet',
    R.path(['changedEdge', 'node'])(createSheets)
  )(state)
}

const handlers = {
  APOLLO_MUTATION_RESULT: (state, {
    operationName,
    result: { data }
  }) => R.propOr(
    R.identity,
    operationName,
    mutationHandlers
  )(state, data),
  SELECT_SHEET: (state, { sheet }) => R.assoc('selectedSheet', sheet)(state)
}

const initialState = {
  selectedSheet: {
    characs: [],
    gear: [],
    name: ''
  }
}

const reducer = createReducer(initialState, handlers)

export default reducer
