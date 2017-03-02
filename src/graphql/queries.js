import gql from 'graphql-tag'

import { crossroadFragment } from './fragments'

export const GET_PAGE_EDITOR_QUERY = gql`
query GetPageEditor($pageEditorId: ID!) {
  getPageEditor(id: $pageEditorId) {
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
${crossroadFragment}
`

/* eslint-disable max-len */
export const GET_ALL_CROSSROADS_QUERY = gql`
query GetAllCrossroads($first: Int, $after: String, $orderBy: [CrossroadOrderByArgs]) {
  viewer {
    allCrossroads(first: $first, after: $after, orderBy: $orderBy) {
      edges {
        cursor
        node {
          ...crossroadFields
        }
      }
    }
  }
}
${crossroadFragment}
`
