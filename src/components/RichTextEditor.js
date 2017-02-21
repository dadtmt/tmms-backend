import React, { Component, PropTypes } from 'react'
import { Button, ButtonToolbar, Panel } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import Editor from 'draft-js-plugins-editor'
import createEmojiPlugin from 'draft-js-emoji-plugin'
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin'
import { convertToRaw, EditorState } from 'draft-js'

import BlockRichTextButton from './BlockRichTextButton'
import InlineRichTextButton from './InlineRichTextButton'

import 'draft-js-emoji-plugin/lib/plugin.css'

const emojiPlugin = createEmojiPlugin()
const { EmojiSuggestions } = emojiPlugin

const richButtonsPlugin = createRichButtonsPlugin()
const {
  // Inline buttons
  ItalicButton, BoldButton,
   UnderlineButton,
  // Block buttons
  ParagraphButton, ULButton, H1Button, H2Button
} = richButtonsPlugin

const plugins = [emojiPlugin, richButtonsPlugin]

export default class RichTextEditor extends Component {

  constructor() {
    super()
    this.state = { editorState: EditorState.createEmpty() }
  }

  render() {

    return (
      <div>
          <ButtonToolbar>
            <BoldButton>
              <InlineRichTextButton iconName='bold'/>
            </BoldButton>
            <ItalicButton>
              <InlineRichTextButton iconName='italic'/>
            </ItalicButton>
            <UnderlineButton>
              <InlineRichTextButton iconName='underline'/>
            </UnderlineButton>
            <ParagraphButton>
              <BlockRichTextButton iconName='paragraph' />
            </ParagraphButton>
            <H1Button>
              <BlockRichTextButton iconName='header' />
            </H1Button>
            <H2Button>
              <BlockRichTextButton iconName='header' />
            </H2Button>
            <ULButton>
              <BlockRichTextButton iconName='list-ul' />
            </ULButton>
          </ButtonToolbar>
          <p />
          <Panel header='edit your text below'>
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
        </Panel>
        <EmojiSuggestions />
        <Button
          bsStyle='primary'
          onClick={
            () => this.props.handleSave(
                convertToRaw(this.state.editorState.getCurrentContent())
            )
          }
        >
          <FontAwesome name='paper-plane' />
        </Button>
      </div>
    )
  }
}

RichTextEditor.propTypes = {
  handleSave: PropTypes.func.isRequired
}
