import R from 'ramda'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { pageEditorId } from '../config'
import makeReducer from '../reducers/makeReducer'
import Editor from '../components/Editor'

export const getCurrentPageQuery = gql`
query GetPageEditor($pageEditorId: ID!) {
  getPageEditor(id: $pageEditorId) {
    id
    currentPage {
      id
      text
      choices {
        edges {
          node {
            id
            text
            made
          }
        }
      }
    }
  }
}
`

// NOT WORKING reducer, bad hack by refetchQueries in mutation

const mutationHandlers = {
  CreatePage: (state, { createPage: { changedPage } }) => R.set(
    R.lensPath(['getPageEditor', 'currentPage']),
    changedPage,
    state
  )
}

const handlers = {
  APOLLO_MUTATION_RESULT: (state, {
    operationName,
    result: { data }
  }) => R.propOr(
    R.identity,
    operationName,
    mutationHandlers
  )(state, data)
}

export const reducer = makeReducer(handlers)

const emptyPage = {
  choices: [],
  id: '',
  text: ''
}

export const makeProps = R.ifElse(
  R.prop('loading'),
  R.pipe(
    R.pick(['loading']),
    R.merge(emptyPage)
  ),
  R.pipe(
    R.pathOr(emptyPage, ['getPageEditor', 'currentPage']),
    R.over(
      R.lensProp('choices'),
      R.propOr([], 'edges')
    )
  )
)

export default graphql(
  getCurrentPageQuery,
  {
    options: {
      // reducer,
      variables: { pageEditorId }
    }
  }
)(Editor)
