import addGraphQLSubscriptions from './addGraphQLSubscriptions'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { SubscriptionClient } from 'subscriptions-transport-ws'

export default function makeApolloClient() {
  const scapholdUrl = 'us-west-2.api.scaphold.io/graphql/tmms'
  const graphqlUrl = `https://${scapholdUrl}`
  const websocketUrl = `wss://${scapholdUrl}`
  const networkInterface = createNetworkInterface({ uri: graphqlUrl })
  const wsClient = new SubscriptionClient(websocketUrl)
  const networkInterfaceWithSubscriptions =
    addGraphQLSubscriptions(networkInterface, wsClient)

  const clientGraphql = new ApolloClient({
    addTypename: true,
    dataIdFromObject: o => o.id,
    initialState: {},
    networkInterface: networkInterfaceWithSubscriptions
  })

  return clientGraphql
}
