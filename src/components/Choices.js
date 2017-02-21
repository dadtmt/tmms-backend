import React, { PropTypes } from 'react'
import { ListGroup } from 'react-bootstrap'

import Choice from './Choice.js'

const Choices = ({ choices }) => <ListGroup>
  {
    choices.edges.map(({ node }) => <Choice key={node.id} {...node} />)
  }
</ListGroup>

Choices.propTypes = {
  choices: PropTypes.shape({
    edges: PropTypes.array.isRequired
  }).isRequired
}

export default Choices
