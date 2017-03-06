import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'

import Choices from './Choices'
import RichTextDisplay from './RichTextDisplay'
import TestDices from './TestDices'

const Crossroad = ({ createdAt, text, choices, testDices }) =>
<Panel header={createdAt}>
  <RichTextDisplay rawContent={text} />
  <Choices choices={choices} />
  <TestDices testDices={testDices} />
</Panel>

Crossroad.propTypes = {
  choices: PropTypes.shape({
    edges: PropTypes.array.isRequired
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  testDices: PropTypes.shape({
    edges: PropTypes.array.isRequired
  }).isRequired,
  text: PropTypes.object.isRequired
}

export default Crossroad
