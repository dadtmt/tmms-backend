import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { getCurrentPageQuery } from './CurrentPageWithData'
import { pageEditorId } from '../config'
import ChoiceEditor from '../components/ChoiceEditor'

export const CREATE_CHOICE_MUTATION = gql`
  mutation CreateChoice($choice: CreateChoiceInput!) {
    createChoice(input: $choice){
      changedChoice {
        id
        text
        made
      }
    }
  }
`

export const withCreateChoice = graphql(
  CREATE_CHOICE_MUTATION,
  {
    props: ({ mutate, ownProps: { currentPageId } }) => ({
      handleSave: choiceContent => mutate({
        refetchQueries: [{
          query: getCurrentPageQuery,
          variables: { pageEditorId }
        }],
        variables: {
          choice: {
            pageId: currentPageId,
            text: JSON.stringify(choiceContent)
          }
        }
      })
    })
  }
)

export default withCreateChoice(ChoiceEditor)
