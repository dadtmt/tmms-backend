import R from 'ramda'
import React, { Component, PropTypes } from 'react'
import { Button, ButtonToolbar, Checkbox, Col, Row } from 'react-bootstrap'

import {
  UPDATE_CHOICE_SUBSCRIPTION,
  UPDATE_TESTDICE_SUBSCRIPTION
} from '../graphql/subscriptions'
import CreateChoice from './CreateChoice'
import CreateTest from './CreateTest'
import CreateCrossroad from './CreateCrossroad'
import CurrentCrossroad from './CurrentCrossroad'
import Crossroads from './Crossroads'

export const getCrossroadsFromData = R.pipe(
  R.pathOr(
    [],
    ['viewer', 'user', 'editors', 'edges']
  ),
  R.head,
  R.pathOr([], ['node', 'crossroads', 'edges'])
)

export const getCurrentCrossroad = R.pipe(
  R.head,
  R.propOr(null, 'node')
)

export const isChoiceMade = R.pipe(
  R.converge(
    R.concat,
    [
      R.pipe(
        R.pathOr([], ['choices', 'edges']),
        R.map(R.path(['node', 'made']))
      ),
      R.pipe(
        R.pathOr([], ['testDices', 'edges']),
        R.map(R.path(['node', 'made']))
      )
    ]
  ),
  R.reduce(
    R.or,
    false
  )
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
    const crossroadId = R.propOr(
      null,
      'id'
    )(getCurrentCrossroad(getCrossroadsFromData(data)))
    const lastCrossroadId =
      R.propOr(
        null,
        'id'
      )(getCurrentCrossroad(getCrossroadsFromData(this.props.data)))

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

    const crossroads = getCrossroadsFromData(data)

    const currentCrossroad = getCurrentCrossroad(crossroads)

    const crossroadsWithoutCurrent = R.tail(crossroads)
    const allowNewCrossroad = R.isNil(currentCrossroad) ||
      isChoiceMade(currentCrossroad)

    const isCrossroadReady = R.propOr(false, 'isReady')(currentCrossroad)

    const crossroadId = R.propOr(null, 'id')(currentCrossroad)

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
          <Crossroads crossroads={{ edges: crossroadsWithoutCurrent }} />
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
