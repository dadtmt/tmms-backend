import React, { PropTypes } from 'react'
import { ControlLabel, FormGroup, FormControl } from 'react-bootstrap'

const SelectValueGroup = ({
  controlId,
  input,
  label,
  values
}) => (
  <FormGroup controlId={controlId}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl componentClass='select' {...input}>
      {values.map(
        ({ sLabel, value }) => <option
        key={value}
        value={value}
        >
          {sLabel}
        </option>
      )}
    </FormControl>
  </FormGroup>
)

SelectValueGroup.propTypes = {
  controlId: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired
}

export default SelectValueGroup
