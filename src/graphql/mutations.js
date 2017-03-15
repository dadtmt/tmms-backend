import gql from 'graphql-tag'

import {
  choiceFragment,
  crossroadFragment,
  sheetFragment
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

export const CREATE_SHEET_MUTATION = gql`
mutation CreateSheet($newSheet: CreateSheetsInput!) {
  createSheets(input: $newSheet){
    changedEdge{
      node{
        ...sheetFields
      }
    }
  }
}
${sheetFragment}
`

export const UPDATE_SHEET_MUTATION = gql`
mutation UpdateSheet($sheet: UpdateSheetsInput!) {
  updateSheets(input: $sheet){
    changedEdge{
      node{
        ...sheetFields
      }
    }
  }
}
${sheetFragment}
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
