import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { getCurrentPageQuery } from './CurrentPageWithData'
import { pageEditorId } from '../config'
import PageEditor from '../components/PageEditor'


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

export const withCreatePage = graphql(
  CREATE_PAGE_MUTATION,
  {
    props: ({ mutate }) => ({
      handleSave: pageContent => mutate({
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

export default withCreatePage(PageEditor)
