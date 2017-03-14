import R from 'ramda'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'

import { pageEditorId } from '../config'
import makeReducer from '../reducers/makeReducer'
import { GET_SHEETS_QUERY } from '../graphql/queries'
import SheetSelector from './SheetSelector'

const updatePageEditor = update => R.over(
  R.lensPath(['viewer', 'user', 'editors', 'edges']),
  R.over(
    R.lensIndex(0),
    update
  )
)

const mutationHandlers = {
  CreateSheet: (state, { createSheets }) => updatePageEditor(
    R.over(
      R.lensPath(['node', 'sheets', 'edges']),
      R.append(createSheets.changedEdge)
    )
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
  )(state, data)
}

export const reducer = makeReducer(handlers)

const withData = graphql(
  GET_SHEETS_QUERY,
  {
    options: {
      reducer,
      variables: {
        pageEditorId
      }
    }
  }
)

export const getSheetsFromData = R.pipe(
  R.pathOr([], ['viewer', 'user', 'editors', 'edges']),
  R.head,
  R.pathOr([], ['node', 'sheets', 'edges'])
)

const emptyCharacter = {
  name: 'new character name'
}

export const getSheetByIdFromData = id => R.pipe(
  getSheetsFromData,
  R.indexBy(R.path(['node', 'id'])),
  R.pathOr(emptyCharacter, [id, 'node'])
)

const mapStateToProps = ({ sheetSelector: { selectedSheet } }, { data }) => ({
  selectedSheet,
  sheets: getSheetsFromData(data)
})

const mapDispatchToProps = (dispatch, { data }) => ({
  selectSheet: event => dispatch({
    sheet: getSheetByIdFromData(event.target.value)(data),
    type: 'SELECT_SHEET'
  })
})

export default withData(
  connect(mapStateToProps, mapDispatchToProps)(SheetSelector)
)
