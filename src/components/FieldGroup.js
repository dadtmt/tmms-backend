import React, { PropTypes } from 'react'
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap'

const FieldGroup = ({ id, label, ...props }) =>
    <FormGroup controlId={id}>
      {label && <ControlLabel>{label}</ControlLabel>}
      <FormControl {...props} />
    </FormGroup>

FieldGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string
}

export default FieldGroup
