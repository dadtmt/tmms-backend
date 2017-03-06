import gql from 'graphql-tag'

import {
  choiceFragment,
  crossroadFragment,
  testDiceFragment
} from './fragments'

export const CREATE_CHOICE_MUTATION = gql`
  mutation CreateChoice($newChoice: CreateChoiceInput!) {
    createChoice(input: $newChoice) {
      changedEdge{
        node{
          ...choiceFields
        }
      }
    }
  }
  ${choiceFragment}
`

export const DELETE_CHOICE_MUTATION = gql`
  mutation DeleteChoice($choice: DeleteChoiceInput!){
    deleteChoice(input: $choice) {
      changedChoice {
        id
      }
    }
  }
`

export const CREATE_CROSSROAD_MUTATION = gql`
mutation CreateCrossroad($newCrossroad: CreateCrossroadInput!) {
  createCrossroad(input: $newCrossroad){
    changedEdge{
      node{
        ...crossroadFields
      }
    }
  }
}
${crossroadFragment}
`

export const CREATE_TEST_MUTATION = gql`
mutation CreateTestDice($createTest: CreateTestDiceInput!) {
  createTestDice(input: $createTest){
    changedEdge{
      node{
        ...testDiceFields
      }
    }
  }
}
${testDiceFragment}
`

export const DELETE_TEST_MUTATION = gql`
  mutation DeleteTestDice($testDice: DeleteTestDiceInput!){
    deleteTestDice(input: $testDice) {
      changedTestDice {
        id
      }
    }
  }
`

export const TOGGLE_CROSSROAD_IS_READY = gql`
mutation ToggleCrossroadReady($toggleCrossroadReady:UpdateCrossroadInput!) {
  updateCrossroad(input: $toggleCrossroadReady) {
    changedCrossroad {
      id,
      isReady
    }
  }
}
`
export const UPDATE_CROSSROAD_TEXT = gql`
mutation UpdateCrossroadText($updateCrossroadText:UpdateCrossroadInput!) {
  updateCrossroad(input: $updateCrossroadText) {
    changedCrossroad {
      id,
      text
    }
  }
}
`
