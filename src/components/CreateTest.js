import React, { Component, PropTypes } from 'react'
import { Checkbox, Panel } from 'react-bootstrap'

import FieldGroup from './FieldGroup'
import RichTextEditor from './RichTextEditor'

class CreateTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      master: false,
      modifier: 0,
      nbDices: 1,
      nbSides: 6
    }
    this.handleNbDicesChange = this.handleNbDicesChange.bind(this)
    this.handleNbSidesChange = this.handleNbSidesChange.bind(this)
    this.handleModifierChange = this.handleModifierChange.bind(this)
    this.handleMasterChange = this.handleMasterChange.bind(this)
  }

  handleNbDicesChange(event) {
    this.setState({ nbDices: event.target.value })
  }

  handleNbSidesChange(event) {
    this.setState({ nbSides: event.target.value })
  }

  handleModifierChange(event) {
    this.setState({ modifier: event.target.value })
  }

  handleMasterChange() {
    this.setState({ master: !this.state.master })
  }

  render() {
    const { createTest, crossroadId } = this.props

    return (
      <Panel
        header='Add a Test'
      >
        <RichTextEditor
          handleSave={
            text => (createTest({
              crossroadId,
              master: this.state.master,
              modifier: this.state.modifier,
              nbDices: this.state.nbDices,
              nbSides: this.state.nbSides,
              text
            }))
          }
        />
        <FieldGroup
          id='nbDices'
          type='number'
          label='Number of dices'
          onChange={this.handleNbDicesChange}
          value={this.state.nbDices}
        />
        <FieldGroup
          id='nbSides'
          type='number'
          label='Number of sides'
          onChange={this.handleNbSidesChange}
          value={this.state.nbSides}
        />
        <FieldGroup
          id='modifier'
          type='number'
          label='modifier'
          onChange={this.handleModifierChange}
          value={this.state.modifier}
        />
      <Checkbox checked={this.state.master} onChange={this.handleMasterChange}>
        The story teller rolls the dice!
      </Checkbox>
      </Panel>
    )
  }
}

CreateTest.propTypes = {
  createTest: PropTypes.func.isRequired,
  crossroadId: PropTypes.string.isRequired
}

export default CreateTest
