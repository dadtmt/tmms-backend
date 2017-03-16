import React, { Component, PropTypes } from 'react'
import {
  ControlLabel,
  FormControl,
  FormGroup,
  Panel
} from 'react-bootstrap'
import { convertToRaw, EditorState } from 'draft-js'

import ButtonGroup from '../forms/components/ButtonGroup'
import DraftField from '../forms/components/DraftField'
import RenderCreator from '../creators/RenderCreator'

class CreateChoice extends Component {

  constructor(props) {
    super(props)
    this.state = {
      content: {},
      editorState: EditorState.createEmpty(),
      type: 'default'
    }
    this.handleEditorChange = this.handleEditorChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
  }

  handleEditorChange(editorState) {
    this.setState({ editorState })
  }

  handleTypeChange(event) {
    this.setState({
      content: {},
      type: event.target.value })
  }

  render() {
    const { submitChoice, crossroadId } = this.props

    return (<Panel
      header='Add a Choice'
    >
      <DraftField
        input={{
          onChange: this.handleEditorChange,
          value: this.state.editorState
        }}
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
          <option value='characterSheet'>Character sheet</option>
        </FormControl>
      </FormGroup>
      <RenderCreator type={this.state.type} />
      <ButtonGroup
        bsStyle='primary'
        glyph='send'
        onClick={() => submitChoice({
          crossroadId,
          text: convertToRaw(this.state.editorState.getCurrentContent()),
          type: this.state.type
        })}
      >
        Submit
      </ButtonGroup>
    </Panel>)
  }
}

CreateChoice.propTypes = {
  crossroadId: PropTypes.string.isRequired,
  submitChoice: PropTypes.func.isRequired
}

export default CreateChoice
