import React, { PropTypes } from 'react'
import Crossroad from './Crossroad.js'

const Crossroads = ({ crossroads }) => <div>
  {
    crossroads.edges.map(({ node }) => <Crossroad key={node.id} {...node} />)
  }
</div>

Crossroads.propTypes = {
  crossroads: PropTypes.shape({
    edges: PropTypes.array.isRequired
  }).isRequired
}

export default Crossroads
