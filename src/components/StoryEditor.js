import R from 'ramda'
import React, { Component, PropTypes } from 'react'
import { Button, ButtonToolbar, Checkbox, Col, Row } from 'react-bootstrap'

import {
  UPDATE_CHOICE_SUBSCRIPTION,
  UPDATE_TESTDICE_SUBSCRIPTION
} from '../graphql/subscriptions'
import StoryFeed from '../containers/StoryFeedWithData'
import CreateChoice from './CreateChoice'
import CreateTest from './CreateTest'
import CreateCrossroad from './CreateCrossroad'
import CurrentCrossroad from './CurrentCrossroad'

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
  constructor(props) {
    super(props)
    this.state = {
      showAddChoice: false,
      showAddTest: false
    }
  }

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
      deleteChoice,
      createCrossroad,
      createTest,
      deleteTestDice,
      data,
      toggleIsReady,
      updateCrossroadText
    } = this.props

    const { loading } = data

    const crossroads = R.pathOr(
      { edges: [] },
      ['getPageEditor', 'crossroads']
    )(data)

    const currentCrossroad = R.pipe(
      R.prop('edges'),
      R.head,
      R.propOr(null, 'node')
    )(crossroads)

// Dirty

    const allowNewCrossroad = R.isEmpty(crossroads.edges) ||
      isChoiceMade(crossroads)

    const isCrossroadReady = isReady(crossroads)

    const crossroadId = R.pipe(
      R.prop('edges'),
      R.head,
      R.pathOr('', ['node', 'id'])
    )(crossroads)

    return (
      <Row>
        <Col sm={6}>
          {loading && <p>Loading...</p>}
          <CreateCrossroad
            createCrossroad={createCrossroad}
            crossroad={allowNewCrossroad ? null : currentCrossroad}
            updateCrossroadText={updateCrossroadText}
          />
          <Checkbox
            checked={isCrossroadReady}
            disabled={allowNewCrossroad}
            onChange={() => toggleIsReady({
              id: crossroadId,
              isReady: !isCrossroadReady
            })}
          >
            Make the page ready to play
          </Checkbox>
          <ButtonToolbar>
            <Button
              bsStyle='primary'
              disabled={allowNewCrossroad}
              onClick={() => this.setState({
                showAddChoice: true,
                showAddTest: false
              })}
            >
              Add a Choice
            </Button>
            <Button
              bsStyle='primary'
              disabled={allowNewCrossroad}
              onClick={() => this.setState({
                showAddChoice: false,
                showAddTest: true
              })}
            >
              Add a Test
            </Button>
          </ButtonToolbar>
          {(this.state.showAddChoice && !allowNewCrossroad) && <CreateChoice
            createChoice={createChoice}
            crossroadId={crossroadId}
          />}
          {(this.state.showAddTest && !allowNewCrossroad) && <CreateTest
            createTest={createTest}
            crossroadId={crossroadId}
          />}
        </Col>
        <Col sm={6}>
          {currentCrossroad && <CurrentCrossroad
            crossroad={currentCrossroad}
            deleteChoice={deleteChoice}
            deleteTestDice={deleteTestDice}
          />}
          <StoryFeed
            currentCrossroadId={R.propOr(null, 'id')(currentCrossroad)}
          />
        </Col>
      </Row>
    )
  }
}

StoryEditor.propTypes = {
  createChoice: PropTypes.func.isRequired,
  createCrossroad: PropTypes.func.isRequired,
  createTest: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  deleteChoice: PropTypes.func.isRequired,
  deleteTestDice: PropTypes.func.isRequired,
  toggleIsReady: PropTypes.func.isRequired,
  updateCrossroadText: PropTypes.func.isRequired
}

export default StoryEditor
