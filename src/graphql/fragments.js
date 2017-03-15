import gql from 'graphql-tag'

export const choiceFragment = gql`
  fragment choiceFields on Choice {
    content
    id
    interactive
    made
    text
    type
  }
`

export const crossroadFragment = gql`
  fragment crossroadFields on Crossroad {
    createdAt
    id
    isReady
    text
    choices(orderBy: {field:createdAt, direction:ASC}){
      edges{
        node{
          ...choiceFields
        }
      }
    }
  }
  ${choiceFragment}
`

export const sheetFragment = gql`
  fragment sheetFields on Sheets {
    id
    characs
    description
    gear
    image
    isPlayer
    name
  }
`
