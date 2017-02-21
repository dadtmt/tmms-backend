import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const BlockRichTextButton = ({
  iconName,
  isActive,
  label,
  toggleBlockType
}) => <Button
  active={isActive}
  onClick={toggleBlockType}
  title={label}
>
  <FontAwesome name={iconName} />
</Button>

BlockRichTextButton.propTypes = {
  blockType: PropTypes.string,
  iconName: PropTypes.string,
  isActive: PropTypes.bool,
  label: PropTypes.string,
  toggleBlockType: PropTypes.func
}

export default BlockRichTextButton
