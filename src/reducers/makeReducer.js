import R from 'ramda'

export const createReducer = (initialState, handlers) =>
  (state = initialState, action) => R.propOr(
  R.identity,
  R.prop('type', action),
  handlers
)(state, action)

export const enhanceReducer = R.curry((handlers, reducer) =>
  (state, action) => R.propOr(
    reducer,
    R.prop('type', action),
    handlers
  )(state, action))

const makeReducer = handlers =>
  (state, action) => R.propOr(
    R.identity,
    R.prop('type', action),
    handlers
  )(state, action)

export default makeReducer
