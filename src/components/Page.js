import React, { PropTypes } from 'react'
import PageChoices from './PageChoices'
import RichTextDisplay from './RichTextDisplay'

const Page = ({ id, text, choices }) => <div className='PageEditor'>
  <p>Page Id: {id}</p>
  <RichTextDisplay rawContent={text} />
  <PageChoices choices={choices} />
</div>

Page.propTypes = {
  choices: PropTypes.shape({
    edges: PropTypes.array.isRequired
  }).isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Page
