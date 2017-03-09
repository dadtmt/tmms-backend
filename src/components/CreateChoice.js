import React, { Component, PropTypes } from 'react'
import { ControlLabel, FormControl, FormGroup, Panel } from 'react-bootstrap'

import RenderCreator from '../creators/RenderCreator'
import RichTextEditor from './RichTextEditor'

class CreateChoice extends Component {

  constructor(props) {
    super(props)
    this.state = {
      content: {},
      type: 'default'
    }
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
  }

  handleTypeChange(event) {
    this.setState({
      content: {},
      type: event.target.value })
  }

  handleContentChange(content) {
    this.setState({ content })
  }

  render() {
    const { createChoice, crossroadId } = this.props

    return (<Panel
      header='Add a Choice'
    >
      <RichTextEditor
        handleSave={
          text => (createChoice({
            content: this.state.content,
            crossroadId,
            text,
            type: this.state.type
          }))
        }
      />
      <FormGroup controlId='selectType'>
        <ControlLabel>Select type</ControlLabel>
        <FormControl
          componentClass='select'
          onChange={this.handleTypeChange}
          placeholder='select'
          value={this.state.type}
        >
          <option value='default'>default</option>
          <option value='dice'>Dice roll</option>
        </FormControl>
      </FormGroup>
      <RenderCreator
        onChange={this.handleContentChange}
        type={this.state.type}
      />
    </Panel>)
  }
}

CreateChoice.propTypes = {
  createChoice: PropTypes.func.isRequired,
  crossroadId: PropTypes.string.isRequired
}

export default CreateChoice
