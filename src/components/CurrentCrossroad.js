import React, { PropTypes } from 'react'
import { Button, ListGroup, ListGroupItem, Panel } from 'react-bootstrap'
import { propType } from 'graphql-anywhere'

import RichTextDisplay from './RichTextDisplay'
import { crossroadFragment } from '../graphql/fragments'
import Choice from './Choice'

const CurrentCrossroad = ({ crossroad, deleteChoice }) =>
  <Panel header='What the player see'>
    <RichTextDisplay rawContent={crossroad.text} />
    <ListGroup>
    {crossroad.choices.edges.map(
      ({ node }) => <ListGroupItem key={node.id}>
      {!crossroad.isReady &&
        <Button bsStyle='danger' onClick={() => deleteChoice(node.id)}>
          delete
        </Button>}
        <Choice {...node} />
      </ListGroupItem>
    )}
    </ListGroup>
  </Panel>

CurrentCrossroad.fragments = {
  crossroad: crossroadFragment
}

CurrentCrossroad.propTypes = {
  crossroad: propType(CurrentCrossroad.fragments.crossroad),
  deleteChoice: PropTypes.func.isRequired
}

export default CurrentCrossroad
