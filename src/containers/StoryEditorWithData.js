import R from 'ramda'
import { graphql } from 'react-apollo'

import { newChoice } from '../api/choice'
import { updateCrossroad, updateEditor } from '../api/editor'
import { pageEditorId } from '../config'
import {
  CREATE_CHOICE_MUTATION,
  DELETE_CHOICE_MUTATION,
  CREATE_CROSSROAD_MUTATION,
  TOGGLE_CROSSROAD_IS_READY,
  UPDATE_CROSSROAD_TEXT
} from '../graphql/mutations'
import { GET_PAGE_EDITOR_QUERY } from '../graphql/queries'
import makeReducer from '../reducers/makeReducer'
import StoryEditor from '../components/StoryEditor'

const withCreateChoice = graphql(
  CREATE_CHOICE_MUTATION,
  {
    props: ({ mutate }) => ({
      createChoice: values => mutate({
        variables: {
          newChoice: newChoice(values)
        }
      })
    })
  }
)

const withDeleteChoice = graphql(
  DELETE_CHOICE_MUTATION,
  {
    props: ({ mutate }) => ({
      deleteChoice: id => mutate({
        variables: {
          choice: {
            id
          }
        }
      })
    })
  }
)

const withCreateCrossroad = graphql(
  CREATE_CROSSROAD_MUTATION,
  {
    props: ({ mutate }) => ({
      createCrossroad: text => mutate({
        variables: {
          newCrossroad: {
            pageEditorId,
            text
          }
        }
      })
    })
  }
)

const withToggleCrossroadIsReady = graphql(
  TOGGLE_CROSSROAD_IS_READY,
  {
    props: ({ mutate }) => ({
      toggleIsReady: values => mutate({
        variables: {
          toggleCrossroadReady: {
            ...values
          }
        }
      })
    })
  }
)

const withUpdateCrossroadText = graphql(
  UPDATE_CROSSROAD_TEXT,
  {
    props: ({ mutate }) => ({
      updateCrossroadText: values => mutate({
        variables: {
          updateCrossroadText: {
            ...values
          }
        }
      })
    })
  }
)

const mutationHandlers = {
  CreateChoice: (state, { createChoice }) => updateCrossroad(
    R.over(
      R.lensPath(['node', 'choices', 'edges']),
      R.append(createChoice.changedEdge)
    )
  )(state),
  CreateCrossroad: (state, { createCrossroad }) => updateEditor(
    R.over(
      R.lensPath(['node', 'crossroads', 'edges']),
      R.prepend(createCrossroad.changedEdge)
    )
  )(state),
  // CreateSheets: (state, { createSheets }) => updateEditor(
  //   R.over(
  //     R.lensPath(['node', 'sheets', 'edges']),
  //     R.append(createSheets.changedEdge)
  //   )
  // )(state),
  DeleteChoice: (state, { deleteChoice }) => updateCrossroad(
    R.over(
      R.lensPath(['node', 'choices', 'edges']),
      R.filter(({ node }) => node.id !== deleteChoice.changedChoice.id)
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
  GET_PAGE_EDITOR_QUERY,
  {
    options: {
      reducer,
      variables: { pageEditorId }
    }
  }
)

export default R.compose(
  withCreateChoice,
  withDeleteChoice,
  withCreateCrossroad,
  withData,
  withToggleCrossroadIsReady,
  withUpdateCrossroadText
)(StoryEditor)
