import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import addGraphQLSubscriptions from './addGraphQLSubscriptions'
import { scapholdUrl } from './config'

export default function makeApolloClient() {
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
