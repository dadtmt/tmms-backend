import React, { Component, PropTypes } from 'react'
import { ButtonToolbar, Panel } from 'react-bootstrap'
import Editor from 'draft-js-plugins-editor'
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin'
import createImagePlugin from 'draft-js-image-plugin'
import { EditorState } from 'draft-js'

import BlockRichTextButton from './draftFieldComponents/BlockRichTextButton'
import InlineRichTextButton from './draftFieldComponents/InlineRichTextButton'

import 'draft-js-image-plugin/lib/plugin.css'

export default class DraftField extends Component {

  constructor() {
    super()
    const imagePlugin = createImagePlugin()
    const { addImage } = imagePlugin
    this.addImage = addImage
    const richButtonsPlugin = createRichButtonsPlugin()
    const {
      // Inline buttons
      ItalicButton,
      BoldButton,
      UnderlineButton,
      // Block buttons
      ParagraphButton,
      ULButton,
      H1Button,
      H2Button
    } = richButtonsPlugin
    this.components = {
      BoldButton,
      H1Button,
      H2Button,
      ItalicButton,
      ParagraphButton,
      ULButton,
      UnderlineButton
    }
    this.plugins = [imagePlugin, richButtonsPlugin]
    // Because imagePlugin throw error this.plugins = [richButtonsPlugin]
  }

  render() {
    const { input: { onChange, value } } = this.props
    const editorState = value === ''
      ? EditorState.createEmpty()
      : value

    const {
      // Inline buttons
      ItalicButton,
      BoldButton,
      UnderlineButton,
      // Block buttons
      ParagraphButton,
      ULButton,
      H1Button,
      H2Button
    } = this.components

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
          <p/>
          <Panel header='edit your text below'>
            <Editor
              editorState={editorState}
              onChange={changedEditorState => onChange(changedEditorState)}
              plugins={this.plugins}
            />
        </Panel>
      </div>
    )
  }
}

DraftField.propTypes = {
  input: PropTypes.object.isRequired
}
