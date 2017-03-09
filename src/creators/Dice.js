import React, { Component, PropTypes } from 'react'
import { Checkbox, Panel } from 'react-bootstrap'

import FieldGroup from '../components/FieldGroup'

class Dice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      master: false,
      modifier: 0,
      nbDices: 1,
      nbSides: 6
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleNbDicesChange = this.handleNbDicesChange.bind(this)
    this.handleNbSidesChange = this.handleNbSidesChange.bind(this)
    this.handleModifierChange = this.handleModifierChange.bind(this)
    this.handleMasterChange = this.handleMasterChange.bind(this)
  }

  componentDidMount() {
    this.handleChange()
  }

  handleChange() {
    this.props.onChange(this.state)
  }

  handleNbDicesChange(event) {
    this.setState({ nbDices: event.target.value })
    this.handleChange()
  }

  handleNbSidesChange(event) {
    this.setState({ nbSides: event.target.value })
    this.handleChange()
  }

  handleModifierChange(event) {
    this.setState({ modifier: event.target.value })
    this.handleChange()
  }

  handleMasterChange() {
    this.setState({ master: !this.state.master })
    this.handleChange()
  }

  render() {

    return (
      <Panel
        header='Add a Test'
      >
        <Checkbox
          checked={this.state.master}
          onClick={this.handleMasterChange}
        >
          The story teller rolls the dice!
        </Checkbox>
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
      </Panel>
    )
  }
}

Dice.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default Dice
