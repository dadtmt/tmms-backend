import React, { PropTypes } from 'react'
import Page from './Page'

const StoryFeed = ({ pages }) => <div>
  {
    pages.map(page => <Page key={page.id} {...page } />)
  }
</div>

StoryFeed.propTypes = {
  pages: PropTypes.array.isRequired
}

export default StoryFeed
