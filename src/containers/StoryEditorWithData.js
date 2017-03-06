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
import StoryEditor from '../components/StoryEditor'

const withCreateChoice = graphql(
  CREATE_CHOICE_MUTATION,
  {
    props: ({ mutate }) => ({
      createChoice: values => mutate({
        updateQueries: {
          GetPageEditor: (prev, result) => R.over(
            R.lensPath(['getPageEditor', 'crossroads', 'edges']),
            R.over(
              R.lensIndex(0),
              R.over(
                R.lensPath(['node', 'choices', 'edges']),
                R.append(result.mutationResult.data.createChoice.changedEdge)
              )
            )
          )(prev)
        },
        variables: {
          newChoice: {
            ...values,
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
        updateQueries: {
          GetPageEditor: (prev, result) => R.over(
            R.lensPath(['getPageEditor', 'crossroads', 'edges']),
            R.over(
              R.lensIndex(0),
              R.over(
                R.lensPath(['node', 'choices', 'edges']),
                R.filter(
                  ({ node }) => node.id !==
                    result.mutationResult.data.deleteChoice.changedChoice.id
                )
              )
            )
          )(prev)
        },
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
        updateQueries: {
          GetPageEditor: (prev, result) => R.assocPath(
            ['getPageEditor', 'crossroads', 'edges'],
            [result.mutationResult.data.createCrossroad.changedEdge]
          )(prev)
        },
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

const withCreateTest = graphql(
  CREATE_TEST_MUTATION,
  {
    props: ({ mutate }) => ({
      createTest: values => mutate({
        updateQueries: {
          GetPageEditor: (prev, result) => R.over(
            R.lensPath(['getPageEditor', 'crossroads', 'edges']),
            R.over(
              R.lensIndex(0),
              R.over(
                R.lensPath(['node', 'testDices', 'edges']),
                R.append(result.mutationResult.data.createTestDice.changedEdge)
              )
            )
          )(prev)
        },
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
        updateQueries: {
          GetPageEditor: (prev, result) => R.over(
            R.lensPath(['getPageEditor', 'crossroads', 'edges']),
            R.over(
              R.lensIndex(0),
              R.over(
                R.lensPath(['node', 'testDices', 'edges']),
                R.filter(
                  ({ node }) => node.id !==
                    result.mutationResult.data.deleteTestDice.changedTestDice.id
                )
              )
            )
          )(prev)
        },
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
        updateQueries: {
          GetPageEditor: (prev, result) => R.over(
            R.lensPath(['getPageEditor', 'crossroads', 'edges']),
            R.over(
              R.lensIndex(0),
              R.set(
                R.lensPath(['node', 'isReady']),
                R.path([
                  'mutationResult',
                  'data',
                  'updateCrossroad',
                  'changedCrossroad',
                  'isReady'
                ])(result)
              )
            )
          )(prev)
        },
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
        updateQueries: {
          GetPageEditor: (prev, result) => R.over(
            R.lensPath(['getPageEditor', 'crossroads', 'edges']),
            R.over(
              R.lensIndex(0),
              R.set(
                R.lensPath(['node', 'text']),
                R.path([
                  'mutationResult',
                  'data',
                  'updateCrossroad',
                  'changedCrossroad',
                  'text'
                ])(result)
              )
            )
          )(prev)
        },
        variables: {
          updateCrossroadText: {
            ...values
          }
        }
      })
    })
  }
)

const withData = graphql(
  GET_PAGE_EDITOR_QUERY,
  {
    options: {
      variables: { pageEditorId }
    }
  }
)

export default R.compose(
  withCreateChoice,
  withDeleteChoice,
  withCreateCrossroad,
  withCreateTest,
  withDeleteTestDice,
  withData,
  withToggleCrossroadIsReady,
  withUpdateCrossroadText
)(StoryEditor)
