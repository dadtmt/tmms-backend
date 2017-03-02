import R from 'ramda'
import React, { PropTypes } from 'react'
import { ButtonToolbar, Button } from 'react-bootstrap'

export class Login extends React.Component {

  constructor(props) {
    super(props)
    const { auth, logUser } = props
    this.state = {
      profile: auth.getProfile()
    }
    auth.on('token_received', (token, profile) => {
      logUser(token)
      this.setState({ profile })
    })
    auth.on('logout', () => this.setState({ profile: {} }))
  }

  render() {
    const { auth } = this.props

    return (
      <div>
        <ButtonToolbar >
          {
            R.isEmpty(this.state.profile) &&
            <Button bsStyle='primary' onClick={auth.login.bind(this)}>
              Login
            </Button>
          }
          {
            !R.isEmpty(this.state.profile) &&
            <Button bsStyle='danger' onClick={auth.logout.bind(this)}>
              Logout
            </Button>
          }
        </ButtonToolbar>
      </div>
    )
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  logUser: PropTypes.func.isRequired
}

export default Login
