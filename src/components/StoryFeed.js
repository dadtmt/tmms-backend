import React, { PropTypes } from 'react'
import Page from './Page'

const StoryFeed = ({ pages }) => <div>
  {
    pages.map(({ node }) => <Page key={node.id} {...node } />)
  }
</div>

StoryFeed.propTypes = {
  pages: PropTypes.array.isRequired
}

export default StoryFeed
