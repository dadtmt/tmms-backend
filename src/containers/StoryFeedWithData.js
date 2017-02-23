import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Crossroads from '../components/Crossroads'

/* eslint-disable max-len */
const getAllCrossroadsQuery = gql`
query GetAllCrossroads($first: Int, $after: String, $orderBy: [CrossroadOrderByArgs]) {
  viewer {
    allCrossroads(first: $first, after: $after, orderBy: $orderBy) {
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
          testDices{
            edges{
              node{
                id
                details
                nbDices
                nbSides
                modifier
                text
                result
              }
            }
          }
        }
      }
    }
  }
}
`

/* eslint-disable max-len */

class Feed extends Component {

  render() {
    return this.props.data.loading
      ? <div>Loading...</div>
      : <Crossroads
          crossroads={this.props.data.viewer.allCrossroads}
          header='TODO display created date'
        />
  }
}

Feed.propTypes = {
  data: PropTypes.object.isRequired
}

export default graphql(getAllCrossroadsQuery)(Feed)
