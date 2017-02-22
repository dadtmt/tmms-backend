import React, { PropTypes } from 'react'
import Crossroad from './Crossroad.js'

const Crossroads = ({ crossroads, header }) => <div>
  {
    crossroads.edges.map(({ node }) =>
      <Crossroad header={header} key={node.id} {...node} />)
  }
</div>

Crossroads.propTypes = {
  crossroads: PropTypes.shape({
    edges: PropTypes.array.isRequired
  }).isRequired,
  header: PropTypes.string.isRequired
}

export default Crossroads
