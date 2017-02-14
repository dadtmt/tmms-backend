import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import StoryFeed from '../components/StoryFeed'

const getAllPagesQuery = gql`
  query GetAllPages($first: Int, $after: String, $orderBy: [PageOrderByArgs]) {
    viewer {
      allPages(first: $first, after: $after, orderBy: $orderBy) {
        edges {
          cursor
          node {
            id
            text
            choices {
              edges{
                node {
                  id
                  text
                  made
                }
              }
            }
          }
        }
      }
    }
  }
`

class Feed extends Component {

  render() {
    return this.props.data.loading
      ? <div>Loading...</div>
      : <StoryFeed pages={this.props.data.viewer.allPages.edges} />
  }
}

Feed.propTypes = {
  data: PropTypes.object.isRequired
}

export default graphql(getAllPagesQuery)(Feed)
