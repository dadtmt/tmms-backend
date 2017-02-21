import React, { Component } from 'react'
import { Col, Grid, PageHeader, Row } from 'react-bootstrap'

import StoryEditor from './containers/StoryEditorWithData'
import StoryFeed from './containers/StoryFeedWithData'

class App extends Component {
  render() {
    return (
      <Grid>
        <PageHeader>
          Tell Me My Story
        </PageHeader>
        <Row>
          <Col md={8}>
            <StoryEditor />
          </Col>
          <Col md={4}>
            <StoryFeed />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default App
