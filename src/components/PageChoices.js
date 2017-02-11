import React, { PropTypes } from 'react'
import Choice from './Choice.js'

const PageChoices = ({ choices }) => <div>
  {
    choices.map(choice => <Choice key={choice.id} {...choice} />)
  }
</div>

PageChoices.propTypes = {
  choices: PropTypes.array.isRequired
}

export default PageChoices
