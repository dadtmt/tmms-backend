import React, { PropTypes } from 'react'
import Choice from './Choice.js'

const Choices = ({ choices }) => <div>
  {
    choices.edges.map(({ node }) => <Choice key={node.id} {...node} />)
  }
</div>

Choices.propTypes = {
  choices: PropTypes.shape({
    edges: PropTypes.array.isRequired
  }).isRequired
}

export default Choices
