import React, { Component, PropTypes } from 'react'

import StoryEditor from '../containers/StoryEditorWithData'

class EditAndView extends Component {
  constructor(props) {
    super(props)
    const { auth } = props
    this.state = {
      show: auth.loggedIn()
    }
    auth.on('token_received', () => this.setState({ show: true }))
    auth.on('logout', () => this.setState({ show: false }))
  }

  render() {
    return (
      <div>
        {!this.state.show && <p>Please, login...</p>}
        {this.state.show && <StoryEditor />}
      </div>
    )
  }
}

EditAndView.propTypes = {
  auth: PropTypes.object.isRequired
}

export default EditAndView
