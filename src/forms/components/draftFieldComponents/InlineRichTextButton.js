import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const InlineRichTextButton = ({
  iconName,
  isActive,
  label,
  onMouseDown,
  toggleInlineStyle
}) => <Button
  active={isActive}
  onClick={toggleInlineStyle}
  onMouseDown={onMouseDown}
  title={label}
>
  <FontAwesome name={iconName} />
</Button>

InlineRichTextButton.propTypes = {
  iconName: PropTypes.string,
  inlineStyle: PropTypes.string,
  isActive: PropTypes.bool,
  label: PropTypes.string,
  onMouseDown: PropTypes.func,
  toggleInlineStyle: PropTypes.func
}

export default InlineRichTextButton
