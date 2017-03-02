import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Login from '../components/Login'

const LOGIN_MUTATION = gql`
mutation LoginMutation($login: LoginUserWithAuth0Input!) {
  loginUserWithAuth0(input: $login) {
    user {
      id
      username
    }
  }
}
`

const withLoginMutation = graphql(
  LOGIN_MUTATION,
  {
    props: ({ mutate }) => ({
      logUser: token => mutate({
        variables: {
          login: {
            idToken: token
          }
        }
      })
    })
  }
)

export default withLoginMutation(Login)
