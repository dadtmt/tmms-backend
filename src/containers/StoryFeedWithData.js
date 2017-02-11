import R from 'ramda'
import React, { Component } from 'react'
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

export const transformDataToPages = R.pipe(
  R.path(['viewer', 'allPages', 'edges']),
  R.map(R.pipe(
    R.prop('node'),
    R.over(
      R.lensProp('choices'),
      R.pipe(
        R.prop('edges'),
        R.map(R.prop('node'))
      )
    )
  ))
)

class Feed extends Component {

  constructor() {
    super()
    this.state = {
      pages: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps
    if (!data.loading && !data.error) {
      this.setState({
        pages: transformDataToPages(data)
      })
    }
  }

  render() {
    return this.props.data.loading
      ? <div>Loading...</div>
      : <StoryFeed pages={this.state.pages} />
  }
}

Feed.propTypes = {
  data: React.PropTypes.object.isRequired
}

export default graphql(getAllPagesQuery)(Feed)
