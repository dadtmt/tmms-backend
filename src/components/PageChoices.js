import React, { PropTypes } from 'react'
import Choice from './Choice.js'

const PageChoices = ({ choices }) => <div>
  {
    choices.edges.map(({ node }) => <Choice key={node.id} {...node} />)
  }
</div>

PageChoices.propTypes = {
  choices: PropTypes.shape({
    edges: PropTypes.array.isRequired
  }).isRequired
}

export default PageChoices
