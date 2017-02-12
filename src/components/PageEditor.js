import R from 'ramda'
import React, { Component, PropTypes } from 'react'
import Editor from 'draft-js-plugins-editor'
import createEmojiPlugin from 'draft-js-emoji-plugin'
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'

import 'draft-js-emoji-plugin/lib/plugin.css'
import './PageEditor.css'

const emojiPlugin = createEmojiPlugin()
const { EmojiSuggestions } = emojiPlugin

const richButtonsPlugin = createRichButtonsPlugin()
const {
  // Inline buttons
  ItalicButton, BoldButton, MonospaceButton, UnderlineButton,
  // Block buttons
  ParagraphButton, OLButton, ULButton, H1Button, H2Button
} = richButtonsPlugin

const plugins = [emojiPlugin, richButtonsPlugin]

export default class PageEditor extends Component {

  constructor() {
    super()
    this.state = { editorState: EditorState.createEmpty() }
  }

  componentWillReceiveProps(newProps) {
    const { currentPageText } = newProps
    if (!R.isEmpty(currentPageText)) {
      const rawContent = JSON.parse(currentPageText)
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(rawContent))
      })
    }
  }

  render() {
    const { currentPageId } = this.props
    const editable = R.isEmpty(currentPageId)

    return (
      <div>
        {editable
          ? (<div>
              <BoldButton />
              <ItalicButton />
              <MonospaceButton />
              <UnderlineButton />
              <ParagraphButton />
              <H1Button />
              <H2Button />
              <ULButton />
              <OLButton />
            </div>)
          : <div>Page Id: {currentPageId}</div>
        }
        <div className='PageEditor'>
          <Editor
            editorState={this.state.editorState}
            onChange={
              editorState => {
                this.setState({
                  editorState
                })
              }
            }
            plugins={plugins}
            readOnly={!editable}
          />
        </div>
        <EmojiSuggestions />
        {editable && (
          <button
            onClick={
              () => this.props.handleSave(
                convertToRaw(this.state.editorState.getCurrentContent())
              )
            }
            type='button'
          >
          Save Page
          </button>
        )}
      </div>
    )
  }
}

PageEditor.propTypes = {
  currentPageId: PropTypes.string,
  currentPageText: PropTypes.string,
  handleSave: PropTypes.func.isRequired
}
