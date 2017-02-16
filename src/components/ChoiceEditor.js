import React, { Component, PropTypes } from 'react'
import Editor from 'draft-js-plugins-editor'
import createEmojiPlugin from 'draft-js-emoji-plugin'
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin'
import { convertToRaw, EditorState } from 'draft-js'

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

export default class ChoiceEditor extends Component {

  constructor() {
    super()
    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  render() {
    return (
      <div>
        <div>
            <BoldButton />
            <ItalicButton />
            <MonospaceButton />
            <UnderlineButton />
            <ParagraphButton />
            <H1Button />
            <H2Button />
            <ULButton />
            <OLButton />
        </div>
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
          />
        </div>
        <EmojiSuggestions />
        <button
          onClick={
            () => this.props.handleSave(
              this.props.currentPageId,
              convertToRaw(this.state.editorState.getCurrentContent())
            )
          }
          type='button'
        >
          Save Choice
        </button>
      </div>
    )
  }
}
ChoiceEditor.propTypes = {
  currentPageId: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired
}
