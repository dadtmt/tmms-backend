import React, { PropTypes } from 'react'
import {
  ControlLabel,
  FormGroup,
  FormControl,
  HelpBlock
} from 'react-bootstrap'
import { mapProps } from 'recompose'
import { mapValidationState } from '../utils'

const FieldGroup = ({
  controlId,
  input,
  label,
  meta: { error },
  placeholder,
  size,
  type,
  validationState
}) => (
  <FormGroup
    controlId={controlId}
    bsSize={size ? size : null}
    validationState={validationState ? validationState : null}
  >
    {label && (<ControlLabel>{label}</ControlLabel>)}
    <FormControl {...input} type={type} placeholder={placeholder} />
    {validationState && (<FormControl.Feedback />)}
    <HelpBlock>{error}</HelpBlock>
  </FormGroup>
)

FieldGroup.propTypes = {
  controlId: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string.isRequired,
  validationState: PropTypes.string
}

export const ValidableFieldGroup = mapProps(mapValidationState)(FieldGroup)

export default FieldGroup
