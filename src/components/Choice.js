import React, { PropTypes } from 'react'
import { ListGroupItem } from 'react-bootstrap'

import RichTextDisplay from './RichTextDisplay'

const Choice = ({ made, text }) => <ListGroupItem active={made}>
  <RichTextDisplay rawContent={text} />
</ListGroupItem>

Choice.propTypes = {
  made: PropTypes.bool.isRequired,
  text: PropTypes.object.isRequired
}

export default Choice
