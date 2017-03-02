import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import addGraphQLSubscriptions from './addGraphQLSubscriptions'
import { scapholdUrl } from './config'

export default function makeApolloClient() {
  const graphqlUrl = `https://${scapholdUrl}`
  const websocketUrl = `wss://${scapholdUrl}`
  const networkInterface = createNetworkInterface({ uri: graphqlUrl })
  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      req.options.headers.authorization =
        localStorage.getItem('id_token')
          ? `Bearer ${localStorage.getItem('id_token')}` : null
      next()
    }
  }])
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
