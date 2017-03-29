import React, { PropTypes } from 'react'
import { ButtonToolbar, Button, FormGroup } from 'react-bootstrap'

export class Login extends React.Component {

  constructor(props) {
    super(props)
    const { auth, logUser } = props
    this.state = {
      loggedIn: auth.loggedIn(),
      profile: auth.getProfile()
    }
    auth.on('token_received', (token, profile) => {
      logUser(token)
      this.setState({
        loggedIn: auth.loggedIn(),
        profile
      })
    })
    auth.on('logout', () => this.setState({
      loggedIn: auth.loggedIn(),
      profile: {}
    }))
  }

  render() {
    const { auth } = this.props

    return (
      <FormGroup>
        <ButtonToolbar >
          {
            this.state.loggedIn
            ? <div>
                <Button bsStyle='danger' onClick={auth.logout.bind(this)}>
                  Logout
                </Button>
                <span>Logged as {this.state.profile.name}</span>
              </div>
            : <Button bsStyle='primary' onClick={auth.login.bind(this)}>
                Login
              </Button>
          }
        </ButtonToolbar>
      </FormGroup>
    )
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  logUser: PropTypes.func.isRequired
}

export default Login
