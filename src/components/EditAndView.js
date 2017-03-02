import React, { Component, PropTypes } from 'react'
import { Col, Row } from 'react-bootstrap'

import StoryEditor from '../containers/StoryEditorWithData'
import StoryFeed from '../containers/StoryFeedWithData'

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
        {this.state.show &&
          <Row>
            <Col md={8}>
              <StoryEditor />
            </Col>
            <Col md={4}>
              <StoryFeed />
            </Col>
          </Row>}
      </div>
    )
  }
}

EditAndView.propTypes = {
  auth: PropTypes.object.isRequired
}

export default EditAndView
