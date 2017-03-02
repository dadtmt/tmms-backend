import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'

import { GET_ALL_CROSSROADS_QUERY } from '../graphql/queries'
import Crossroads from '../components/Crossroads'

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

export default graphql(GET_ALL_CROSSROADS_QUERY)(Feed)
