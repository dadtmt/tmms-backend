import R from 'ramda'
import React, { Component, PropTypes } from 'react'
import { Checkbox, Col, Row } from 'react-bootstrap'
import { isChoiceMade } from 'tmms-api/lib/crossroad'
import { getCurrentCrossroadId, splitCrossroads } from 'tmms-api/lib/editor'

import { UPDATE_CHOICE_SUBSCRIPTION } from '../graphql/subscriptions'
import ButtonGroup from '../forms/components/ButtonGroup'
import CreateChoice from '../containers/CreateChoiceWithMutation'
import CreateCrossroad from './CreateCrossroad'
import CurrentCrossroad from './CurrentCrossroad'
import Crossroads from './Crossroads'

class StoryEditor extends Component {

  componentWillReceiveProps(newProps) {
    const { data } = newProps
    const { loading } = data

    if (!loading) {
      const crossroadId = getCurrentCrossroadId(data)
      const lastCrossroadId = getCurrentCrossroadId(this.props.data)

      if (!R.isNil(crossroadId) && crossroadId !== lastCrossroadId) {
        this.choiceSubscription = data.subscribeToMore({
          document: UPDATE_CHOICE_SUBSCRIPTION,
          updateQuery: prev => prev,
          variables: {
            choiceFilter: {
              crossroadId: {
                eq: crossroadId
              }
            }
          }
        })
      }
    }
  }

  render() {
    const {
      createChoice,
      deleteChoice,
      createCrossroad,
      data,
      toggleIsReady,
      updateCrossroadText
    } = this.props

    const { loading } = data
    const { current, lasts } = splitCrossroads(data)

    const isCrossroadReady = R.propOr(false, 'isReady')(current)

    const crossroadId = R.propOr(null, 'id')(current)

    const skipId = R.propOr(null, 'skipId')(this.state)

    const currentCrossroadIsNotSet = (skipId === crossroadId)

    const preferNewCrossroad = !currentCrossroadIsNotSet &&
      isChoiceMade(current)

    return (
      <Row>
        <Col sm={6}>
          {loading && <p>Loading...</p>}
          <ButtonGroup
            bsSize='large'
            bsStyle={preferNewCrossroad ? 'primary' : 'default'}
            glyph='road'
            onClick={() => this.setState({ skipId: crossroadId })}
            title='new page'
          />
          <CreateCrossroad
            createCrossroad={createCrossroad}
            crossroad={currentCrossroadIsNotSet ? null : current}
            updateCrossroadText={updateCrossroadText}
          />
          <Checkbox
            checked={isCrossroadReady}
            disabled={currentCrossroadIsNotSet}
            onChange={() => toggleIsReady({
              id: crossroadId,
              isReady: !isCrossroadReady
            })}
          >
            Make the page ready to play
          </Checkbox>
          {!currentCrossroadIsNotSet && <CreateChoice
            createChoice={createChoice}
            crossroadId={crossroadId}
          />}
        </Col>
        <Col sm={6}>
          {current && <CurrentCrossroad
            crossroad={current}
            deleteChoice={deleteChoice}
          />}
          <Crossroads crossroads={{ edges: lasts }} />
        </Col>
      </Row>
    )
  }
}

StoryEditor.propTypes = {
  createChoice: PropTypes.func.isRequired,
  createCrossroad: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  deleteChoice: PropTypes.func.isRequired,
  toggleIsReady: PropTypes.func.isRequired,
  updateCrossroadText: PropTypes.func.isRequired
}

export default StoryEditor
