import R from 'ramda'
import React, { Component, PropTypes } from 'react'
import { Alert, Button, ButtonToolbar, Col, Panel, Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import Editor from 'draft-js-plugins-editor'
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin'
import createImagePlugin from 'draft-js-image-plugin'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'

import BlockRichTextButton from './BlockRichTextButton'
import InlineRichTextButton from './InlineRichTextButton'
import ImageAdd from './ImageAdd'

import 'draft-js-image-plugin/lib/plugin.css'

export default class RichTextEditor extends Component {

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
    // this.plugins = [imagePlugin, richButtonsPlugin]
    this.plugins = [richButtonsPlugin]
    this.handleChange = this.handleChange.bind(this)
    const editorState = EditorState.createEmpty()
    const originalContent = editorState.getCurrentContent()
    this.state = {
      editorState,
      originalContent,
      originalIsEmpty: true
    }
  }

  componentWillReceiveProps(props) {
    const { text } = props
    if (!R.equals(text, this.props.text)) {
      let editorState = EditorState.createEmpty()
      let originalIsEmpty = true
      if (text) {
        editorState = EditorState.createWithContent(convertFromRaw(text))
        originalIsEmpty = false
      }
      const originalContent = editorState.getCurrentContent()
      this.setState({
        editorState,
        originalContent,
        originalIsEmpty
      })
    }
  }

  handleChange(editorState) {
    this.setState({ editorState })
  }

  render() {

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

    const nothingToSubmit = R.equals(
      this.state.editorState.getCurrentContent(),
      this.state.originalContent
    )

    const warningOnReplaceContent =
      !nothingToSubmit && !this.state.originalIsEmpty

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
          <ImageAdd
            editorState={this.state.editorState}
            onChange={this.handleChange}
            modifier={this.addImage}
          />
          <Panel header='edit your text below'>
            <Editor
              editorState={this.state.editorState}
              onChange={this.handleChange}
              plugins={this.plugins}
            />
        </Panel>
        <Row>
          <Col xs={2}>
            <Button
              disabled={nothingToSubmit}
              bsSize='large'
              bsStyle={warningOnReplaceContent ? 'warning' : 'primary'}
              onClick={
                () => this.props.handleSave(
                    convertToRaw(this.state.editorState.getCurrentContent())
                )
              }
            >
              <FontAwesome name='paper-plane' />
            </Button>
          </Col>
          <Col xs={10}>
            {warningOnReplaceContent && <Alert bsStyle='warning'>
              This will change the content displayed to the player
            </Alert>}
          </Col>
        </Row>
      </div>
    )
  }
}

RichTextEditor.propTypes = {
  handleSave: PropTypes.func.isRequired,
  text: PropTypes.object
}
