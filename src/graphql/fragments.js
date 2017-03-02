import gql from 'graphql-tag'

export const choiceFragment = gql`
  fragment choiceFields on Choice {
    id
    made
    text
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
    id
    isReady
    text
    choices{
      edges{
        node{
          ...choiceFields
        }
      }
    }
    testDices{
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
