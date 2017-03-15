import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'

import Choices from './Choices'
import RichTextDisplay from './RichTextDisplay'

const Crossroad = ({ createdAt, text, choices }) =>
<Panel header={createdAt}>
  <RichTextDisplay rawContent={text} />
  <Choices choices={choices} />
</Panel>

Crossroad.propTypes = {
  choices: PropTypes.shape({
    edges: PropTypes.array.isRequired
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired
}

export default Crossroad
