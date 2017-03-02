import React, { Component } from 'react'
import { Grid, PageHeader } from 'react-bootstrap'

import { auth0CallbackUrl, auth0ClientId, auth0Domain } from './config'
import AuthService from './utils/AuthService'
import EditAndView from './components/EditAndView'
import Login from './containers/LoginWithData'

const auth = new AuthService(auth0ClientId, auth0Domain, auth0CallbackUrl)

class App extends Component {
  render() {
    return (
      <Grid>
        <PageHeader>
          Tell Me My Story
        </PageHeader>
        <Login auth={auth} />
        <EditAndView auth={auth} />
      </Grid>
    )
  }
}

export default App
