import R from 'ramda'
import { graphql } from 'react-apollo'

import { pageEditorId } from '../config'
import {
  CREATE_CHOICE_MUTATION,
  DELETE_CHOICE_MUTATION,
  CREATE_CROSSROAD_MUTATION,
  CREATE_TEST_MUTATION,
  DELETE_TEST_MUTATION,
  TOGGLE_CROSSROAD_IS_READY,
  UPDATE_CROSSROAD_TEXT
} from '../graphql/mutations'
import { GET_PAGE_EDITOR_QUERY } from '../graphql/queries'
import makeReducer from '../reducers/makeReducer'
import StoryEditor from '../components/StoryEditor'

export const isInteractive = R.cond([
  [
    R.propEq('type', 'dice'),
    R.pipe(R.path(['content', 'master']), R.not)
  ],
  [R.propEq('type', 'characterSheet'), R.F],
  [R.T, R.T]
])

const withCreateChoice = graphql(
  CREATE_CHOICE_MUTATION,
  {
    props: ({ mutate }) => ({
      createChoice: values => mutate({
        variables: {
          newChoice: {
            ...values,
            interactive: isInteractive(values),
            made: false
          }
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

const withCreateTestDice = graphql(
  CREATE_TEST_MUTATION,
  {
    props: ({ mutate }) => ({
      createTest: values => mutate({
        variables: {
          createTest: {
            ...values,
            made: false
          }
        }
      })
    })
  }
)

const withDeleteTestDice = graphql(
  DELETE_TEST_MUTATION,
  {
    props: ({ mutate }) => ({
      deleteTestDice: id => mutate({
        variables: {
          testDice: {
            id
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

const updatePageEditor = update => R.over(
  R.lensPath(['viewer', 'user', 'editors', 'edges']),
  R.over(
    R.lensIndex(0),
    update
  )
)

const updateCrossroad = update => updatePageEditor(
  R.over(
    R.lensPath(['node', 'crossroads', 'edges']),
    R.over(
      R.lensIndex(0),
      update
    )
  )
)

const mutationHandlers = {
  CreateChoice: (state, { createChoice }) => updateCrossroad(
    R.over(
      R.lensPath(['node', 'choices', 'edges']),
      R.append(createChoice.changedEdge)
    )
  )(state),
  CreateCrossroad: (state, { createCrossroad }) => updatePageEditor(
    R.over(
      R.lensPath(['node', 'crossroads', 'edges']),
      R.prepend(createCrossroad.changedEdge)
    )
  )(state),
  CreateSheets: (state, { createSheets }) => updatePageEditor(
    R.over(
      R.lensPath(['node', 'sheets', 'edges']),
      R.append(createSheets.changedEdge)
    )
  )(state),
  CreateTestDice: (state, { createTestDice }) => updateCrossroad(
    R.over(
      R.lensPath(['node', 'testDices', 'edges']),
      R.append(createTestDice.changedEdge)
    )
  )(state),
  DeleteChoice: (state, { deleteChoice }) => updateCrossroad(
    R.over(
      R.lensPath(['node', 'choices', 'edges']),
      R.filter(({ node }) => node.id !== deleteChoice.changedChoice.id)
    )
  )(state),
  DeleteTestDice: (state, { deleteTestDice }) => updateCrossroad(
    R.over(
      R.lensPath(['node', 'testDices', 'edges']),
      R.filter(({ node }) => node.id !== deleteTestDice.changedTestDice.id)
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
  withCreateTestDice,
  withDeleteTestDice,
  withData,
  withToggleCrossroadIsReady,
  withUpdateCrossroadText
)(StoryEditor)
