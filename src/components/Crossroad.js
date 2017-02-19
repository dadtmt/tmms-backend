import React, { PropTypes } from 'react'
import Choices from './Choices'
import RichTextDisplay from './RichTextDisplay'

const Crossroad = ({ id, text, choices }) => <div className='PageEditor'>
  <p>Page Id: {id}</p>
  <RichTextDisplay rawContent={text} />
  <Choices choices={choices} />
</div>

Crossroad.propTypes = {
  choices: PropTypes.shape({
    edges: PropTypes.array.isRequired
  }).isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired
}

export default Crossroad
