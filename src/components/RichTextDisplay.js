import React, { PropTypes } from 'react'
import Editor from 'draft-js-plugins-editor'
import { convertFromRaw, EditorState } from 'draft-js'

const RichTextDisplay = ({ rawContent }) => <Editor
  editorState={
    EditorState.createWithContent(convertFromRaw(rawContent))
  }
  onChange={() => {}}
  readOnly={true}
/>

RichTextDisplay.propTypes = {
  rawContent: PropTypes.object.isRequired
}

export default RichTextDisplay
