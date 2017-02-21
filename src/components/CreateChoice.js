import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
import RichTextEditor from './RichTextEditor'

const CreateChoice = ({ createChoice, crossroadId }) =>
<Panel
  header='Add a Choice'
>
  <RichTextEditor
    handleSave={
      text => (createChoice({
        crossroadId,
        text
      }))
    }
  />
</Panel>

CreateChoice.propTypes = {
  createChoice: PropTypes.func.isRequired,
  crossroadId: PropTypes.string.isRequired
}

export default CreateChoice
