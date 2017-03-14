import R from 'ramda'
import React, { PropTypes } from 'react'
import { Button, FormGroup, Glyphicon } from 'react-bootstrap'

const ButtonGroup = props => (
  <FormGroup>
    <Button {...R.omit('glyph')(props)} >
      <Glyphicon glyph={props.glyph} />
    </Button >
  </FormGroup>
)

ButtonGroup.propTypes = {
  glyph: PropTypes.string.isRequired
}

export default ButtonGroup
