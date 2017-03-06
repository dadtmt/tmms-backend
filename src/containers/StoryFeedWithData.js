import R from 'ramda'
import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'

import { GET_ALL_CROSSROADS_QUERY } from '../graphql/queries'
import Crossroads from '../components/Crossroads'

/* eslint-disable max-len */

class Feed extends Component {

  render() {
    const { currentCrossroadId } = this.props

    return this.props.data.loading
      ? <div>Loading...</div>
      : <Crossroads
          crossroads={
            R.over(
              R.lensProp('edges'),
              R.filter(({ node }) => node.id !== currentCrossroadId)
            )(this.props.data.viewer.allCrossroads)
          }
        />
  }
}

Feed.propTypes = {
  currentCrossroadId: PropTypes.string,
  data: PropTypes.object.isRequired
}

export default graphql(GET_ALL_CROSSROADS_QUERY)(Feed)
