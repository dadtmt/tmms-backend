import React, { PropTypes } from 'react'
import Choice from './Choice.js'

const PageChoices = ({ choices }) => <div>
  {
    choices.map(({ node }) => <Choice key={node.id} {...node} />)
  }
</div>

PageChoices.propTypes = {
  choices: PropTypes.array.isRequired
}

export default PageChoices
