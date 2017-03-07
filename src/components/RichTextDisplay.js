import React, { PropTypes } from 'react'
import Editor from 'draft-js-plugins-editor'
import { convertFromRaw, EditorState } from 'draft-js'
import createImagePlugin from 'draft-js-image-plugin'

const imagePlugin = createImagePlugin()

const RichTextDisplay = ({ rawContent }) => <Editor
  editorState={
    EditorState.createWithContent(convertFromRaw(rawContent))
  }
  onChange={() => {}}
  readOnly={true}
  plugins={[imagePlugin]}
/>

RichTextDisplay.propTypes = {
  rawContent: PropTypes.object.isRequired
}

export default RichTextDisplay
