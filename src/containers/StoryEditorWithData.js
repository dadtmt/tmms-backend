import R from 'ramda'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { pageEditorId } from '../config'
import StoryEditor from '../components/StoryEditor'

const CREATE_CHOICE_MUTATION = gql`
  mutation CreateChoice($newChoice: CreateChoiceInput!) {
    createChoice(input: $newChoice) {
      changedEdge{
        node{
          id
          made
          text
        }
      }
    }
  }
`

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

const CREATE_CROSSROAD_MUTATION = gql`
mutation CreateCrossroad($newCrossroad: CreateCrossroadInput!) {
  createCrossroad(input: $newCrossroad){
    changedEdge{
      node{
        id
        text
        choices{
          edges{
            node{
              id
              text
              made
            }
          }
        }
      }
    }
  }
}
`

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

const GET_PAGE_EDITOR_QUERY = gql`
query GetPageEditor($pageEditorId: ID!) {
  getPageEditor(id: $pageEditorId) {
    id
    crossroads(first: 1, orderBy: {field:createdAt, direction:DESC}){
      edges{
        node{
          id
          text
          choices{
            edges{
              node{
                id
                text
                made
              }
            }
          }
        }
      }
    }
  }
}
`

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
  withCreateCrossroad,
  withData
)(StoryEditor)
