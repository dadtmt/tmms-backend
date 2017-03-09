import React, { PropTypes } from 'react'
import Editor from 'draft-js-plugins-editor'
import { convertFromRaw, EditorState } from 'draft-js'
import createImagePlugin from 'draft-js-image-plugin'

const imagePlugin = createImagePlugin()
// const plugins = [imagePlugin]
const plugins = []

const RichTextDisplay = ({ rawContent }) => <Editor
  editorState={
    EditorState.createWithContent(convertFromRaw(rawContent))
  }
  onChange={() => {}}
  readOnly={true}
  plugins={plugins}
/>

RichTextDisplay.propTypes = {
  rawContent: PropTypes.object.isRequired
}

export default RichTextDisplay
