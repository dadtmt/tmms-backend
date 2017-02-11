import React, { PropTypes } from 'react'
import RichTextDisplay from './RichTextDisplay'

const Choice = ({ id, made, text }) => <div className='PageEditor'>
  {made && <p>Player made this choice</p>}
  <p>Choice id: {id}</p>
  <RichTextDisplay rawContent={JSON.parse(text)} />
</div>

Choice.propTypes = {
  id: PropTypes.string.isRequired,
  made: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Choice
