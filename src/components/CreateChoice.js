import React, { PropTypes } from 'react'

import RichTextEditor from './RichTextEditor'

const CreateChoice = ({ createChoice, crossroadId }) => <div>
  <p>Create choice</p>
  <RichTextEditor
    handleSave={
      text => (createChoice({
        crossroadId,
        text
      }))
    }
  />
</div>

CreateChoice.propTypes = {
  createChoice: PropTypes.func.isRequired,
  crossroadId: PropTypes.string.isRequired
}

export default CreateChoice
