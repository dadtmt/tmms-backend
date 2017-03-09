import React, { PropTypes } from 'react'
import { ListGroupItem } from 'react-bootstrap'

import RenderContent from '../renderers/RenderContent'
import RichTextDisplay from './RichTextDisplay'

const Choice = ({ content, made, text, type }) => <ListGroupItem active={made}>
  <RichTextDisplay rawContent={text} />
  <RenderContent made={made} type={type} {...content} />
</ListGroupItem>

Choice.propTypes = {
  content: PropTypes.object,
  made: PropTypes.bool.isRequired,
  text: PropTypes.object.isRequired,
  type: PropTypes.string
}

export default Choice
