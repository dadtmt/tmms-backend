import React, { PropTypes } from 'react'
import { Checkbox } from 'react-bootstrap'

const CheckboxGroup = ({ input, label }) => (
    <Checkbox {...input} checked={input.value} >{label}</Checkbox >
)

CheckboxGroup.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
}

export default CheckboxGroup
