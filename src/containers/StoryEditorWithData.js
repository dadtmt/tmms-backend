import R from 'ramda'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { pageEditorId } from '../config'
import StoryEditor from '../components/StoryEditor'

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

export const clearPageEditorMutation = gql`
mutation ClearPageEditorCurrentPage($clearPageEditor: UpdatePageEditorInput!) {
  updatePageEditor(input: $clearPageEditor){
    changedPageEditor {
      id
      currentPage {
        id
      }
    }
  }
}
`

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

export const CREATE_PAGE_MUTATION = gql`
  mutation CreatePage($page: CreatePageInput!) {
    createPage(input: $page){
      changedPage {
        id
        text
      }
    }
  }
`

export const withCreateChoice = graphql(
  CREATE_CHOICE_MUTATION,
  {
    props: ({ mutate }) => ({
      createChoice: (currentPageId, choiceContent) => mutate({
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

export const withCreatePage = graphql(
  CREATE_PAGE_MUTATION,
  {
    props: ({ mutate }) => ({
      createPage: pageContent => mutate({
        refetchQueries: [{
          query: getCurrentPageQuery,
          variables: { pageEditorId }
        }],
        variables: {
          page: {
            pageEditorId,
            text: JSON.stringify(pageContent)
          }
        }
      })
    })
  }
)

const withData = graphql(
  getCurrentPageQuery,
  {
    options: {
      variables: { pageEditorId }
    }
  }
)

const withClearPageEditor = graphql(
  clearPageEditorMutation,
  {
    props: ({ mutate }) => ({
      clearPageEditor: () => mutate({
        variables: {
          clearPageEditor: {
            currentPageId: '',
            id: pageEditorId
          }
        }
      })
    })
  }
)

export default R.compose(
  withCreateChoice,
  withCreatePage,
  withClearPageEditor,
  withData
)(StoryEditor)
