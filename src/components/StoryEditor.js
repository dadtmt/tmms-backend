import R from 'ramda'
import React, { Component, PropTypes } from 'react'
import { Checkbox } from 'react-bootstrap'

import {
  UPDATE_CHOICE_SUBSCRIPTION,
  UPDATE_TESTDICE_SUBSCRIPTION
} from '../graphql/subscriptions'
import CreateChoice from './CreateChoice'
import CreateTest from './CreateTest'
import CreateCrossroad from './CreateCrossroad'
import Crossroads from './Crossroads'

export const isChoiceMade = R.pipe(
  R.prop('edges'),
  R.head,
  R.converge(
    R.concat,
    [
      R.pipe(
        R.pathOr([], ['node', 'choices', 'edges']),
        R.map(R.path(['node', 'made']))
      ),
      R.pipe(
        R.pathOr([], ['node', 'testDices', 'edges']),
        R.map(R.path(['node', 'made']))
      )
    ]
  ),
  R.reduce(
    R.or,
    false
  )
)

export const isReady = R.pipe(
  R.prop('edges'),
  R.head,
  R.pathOr(false, ['node', 'isReady'])
)

export const getCrossroadIdFromProps = R.pipe(
  R.pathOr([], ['data', 'getPageEditor', 'crossroads', 'edges']),
  R.head,
  R.path(['node', 'id'])
)

class StoryEditor extends Component {

  componentWillReceiveProps(newProps) {
    const { data } = newProps
    const { loading } = data
    const crossroadId = getCrossroadIdFromProps(newProps)
    const lastCrossroadId = getCrossroadIdFromProps(this.props)

    if (!loading && !R.isNil(crossroadId) && crossroadId !== lastCrossroadId) {
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
      this.testDiceSubscription = data.subscribeToMore({
        document: UPDATE_TESTDICE_SUBSCRIPTION,
        updateQuery: prev => prev,
        variables: {
          testDiceFilter: {
            crossroadId: {
              eq: crossroadId
            }
          }
        }
      })
    }
  }

  render() {
    const {
      createChoice,
      createCrossroad,
      createTest,
      data,
      toggleIsReady,
      updateCrossroadText
    } = this.props
    const { loading } = data
    const crossroads = R.pathOr(
      { edges: [] },
      ['getPageEditor', 'crossroads']
    )(data)
    const allowNewCrossroad = R.isEmpty(crossroads.edges) ||
      isChoiceMade(crossroads)
    const isCrossroadReady = isReady(crossroads)
    const crossroadId = R.pipe(
      R.prop('edges'),
      R.head,
      R.pathOr('', ['node', 'id'])
    )(crossroads)
    const currentCrossroad = R.pipe(
      R.prop('edges'),
      R.head,
      R.propOr(null, 'node')
    )(crossroads)

    return (
      <div>
        {loading && <p>Loading...</p>}
        <CreateCrossroad
          createCrossroad={createCrossroad}
          crossroad={currentCrossroad}
          updateCrossroadText={updateCrossroadText}
        />
        {
          !allowNewCrossroad &&
            <div>
              <Checkbox
                checked={isCrossroadReady}
                onChange={() => toggleIsReady({
                  id: crossroadId,
                  isReady: !isCrossroadReady
                })}
              >
                Make the page ready to play
              </Checkbox>
              <CreateChoice
                createChoice={createChoice}
                crossroadId={crossroadId}
              />
              <CreateTest
                createTest={createTest}
                crossroadId={crossroadId}
              />
            </div>
        }
        <Crossroads crossroads={crossroads} header='What the player see:' />
      </div>
    )
  }
}

StoryEditor.propTypes = {
  createChoice: PropTypes.func.isRequired,
  createCrossroad: PropTypes.func.isRequired,
  createTest: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  toggleIsReady: PropTypes.func.isRequired,
  updateCrossroadText: PropTypes.func.isRequired
}

export default StoryEditor
