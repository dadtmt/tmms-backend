import React, { PropTypes } from 'react'
import { ControlLabel, FormControl, FormGroup, Image } from 'react-bootstrap'

const ImageGroup = ({ input, label }) => (
  <FormGroup>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...input} type='text' placeholder='Image url' />
    <Image src={input.value} rounded />
  </FormGroup>
)

ImageGroup.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
}

export default ImageGroup
