import R from 'ramda'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import gql from 'graphql-tag'

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

const mapStateToProps = R.applySpec({
  currentPageId: R.path(['editor', 'currentPageId'])
})

export const withCreatePage = graphql(
  CREATE_PAGE_MUTATION,
  {
    props: ({ mutate }) => ({
      handleSave: pageContent => mutate({
        variables: {
          page: {
            text: JSON.stringify(pageContent)
          }
        }
      })
    })
  }
)

export default connect(mapStateToProps)(withCreatePage(PageEditor))
