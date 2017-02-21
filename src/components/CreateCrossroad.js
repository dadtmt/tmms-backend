import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
import RichTextEditor from './RichTextEditor'

const CreateCrossroad = ({ createCrossroad }) =>
<Panel
  header='Add a new Page'
>
  <RichTextEditor
    handleSave={createCrossroad}
  />
</Panel>

CreateCrossroad.propTypes = {
  createCrossroad: PropTypes.func.isRequired
}

export default CreateCrossroad
