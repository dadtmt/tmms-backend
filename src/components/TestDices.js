import React, { PropTypes } from 'react'
import { ListGroup } from 'react-bootstrap'

import TestDice from './TestDice.js'

const TestDices = ({ testDices }) => <ListGroup>
  {
    testDices.edges.map(({ node }) => <TestDice key={node.id} {...node} />)
  }
</ListGroup>

TestDices.propTypes = {
  testDices: PropTypes.shape({
    edges: PropTypes.array.isRequired
  }).isRequired
}

export default TestDices
