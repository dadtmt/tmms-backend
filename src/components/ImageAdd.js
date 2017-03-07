import React, { Component, PropTypes } from 'react'
import { Button, Col, FormGroup, Glyphicon, Row } from 'react-bootstrap'
import FieldGroup from './FieldGroup'

export default class ImageAdd extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ uri: event.target.value })
  }

  render() {
    const { editorState, modifier, onChange } = this.props

    return (<Row>
      <Col xs={9}>
        <FieldGroup
          id='picurl'
          placeholder='Paste image URL'
          type='text'
          onChange={this.handleChange}
        />
      </Col>
      <Col xs={3}>
        <FormGroup>
          <Button
            onClick={
              () => {
                onChange(modifier(editorState, this.state.uri))
              }
            }
          >
            <Glyphicon glyph='picture' />
          </Button>
        </FormGroup>
      </Col>
    </Row>)
  }
}

ImageAdd.propTypes = {
  editorState: PropTypes.object.isRequired,
  modifier: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}
