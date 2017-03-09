import gql from 'graphql-tag'

import { crossroadFragment } from './fragments'

export const GET_PAGE_EDITOR_QUERY = gql`
query GetPageEditor($pageEditorId: ID!) {
  viewer{
    user{
      editors(where:{id:{eq:$pageEditorId}}){
        edges{
          node{
            id
            crossroads(first: 1, orderBy: {field:createdAt, direction:DESC}){
              edges{
                node{
                  ...crossroadFields
                }
              }
            }
          }
        }
      }
    }
  }
}
${crossroadFragment}
`
