import gql from 'graphql-tag'

export const choiceFragment = gql`
  fragment choiceFields on Choice {
    content
    id
    made
    text
    type
  }
`

export const testDiceFragment = gql`
  fragment testDiceFields on TestDice {
    id
    made
    text
    master
    modifier
    nbDices
    nbSides
    details
    result
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
    testDices(orderBy: {field:createdAt, direction:ASC}){
      edges{
        node{
          ...testDiceFields
        }
      }
    }
  }
  ${choiceFragment}
  ${testDiceFragment}
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
