import gql from 'graphql-tag'

export const UPDATE_CHOICE_SUBSCRIPTION = gql`
  subscription SubscribeToUpdateChoice($choiceFilter:ChoiceSubscriptionFilter) {
    subscribeToChoice(mutations: [updateChoice], filter:$choiceFilter) {
      mutation
      value {
        id
        made
      }
    }
  }
`

/* eslint-disable  max-len*/
export const UPDATE_TESTDICE_SUBSCRIPTION = gql`
  subscription SubscribeToUpdateTestDice($testDiceFilter:TestDiceSubscriptionFilter) {
    subscribeToTestDice(mutations: [updateTestDice], filter:$testDiceFilter) {
      mutation
      value {
        id
        made
      }
    }
  }
`

/* eslint-enable  max-len*/
