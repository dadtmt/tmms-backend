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
