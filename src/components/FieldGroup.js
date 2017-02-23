import React, { PropTypes } from 'react'
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap'

const FieldGroup = ({ id, label, ...props }) =>
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>

FieldGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default FieldGroup
