import R from 'ramda'
import React, { Component, PropTypes } from 'react'
import gql from 'graphql-tag'

import CreateChoice from './CreateChoice'
import CreateTest from './CreateTest'
import CreateCrossroad from './CreateCrossroad'
import Crossroads from './Crossroads'

const subscribeToUpdateChoice = gql`
  subscription SubscribeToUpdateChoice($choiceFilter:ChoiceSubscriptionFilter) {
    subscribeToChoice(mutations: [updateChoice], filter:$choiceFilter) {
      mutation
      value {
        id
        made
      }
    }
  }
`

/* eslint-disable  max-len*/
const subscribeToUpdateTestDice = gql`
  subscription SubscribeToUpdateTestDice($testDiceFilter:TestDiceSubscriptionFilter) {
    subscribeToTestDice(mutations: [updateTestDice], filter:$testDiceFilter) {
      mutation
      value {
        id
        made
      }
    }
  }
`

/* eslint-enable  max-len*/

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
        document: subscribeToUpdateChoice,
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
        document: subscribeToUpdateTestDice,
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
    const { createChoice, createCrossroad, createTest, data } = this.props
    const { loading } = data
    const crossroads = R.pathOr(
      { edges: [] },
      ['getPageEditor', 'crossroads']
    )(data)
    const allowNewCrossroad = R.isEmpty(crossroads.edges) ||
      isChoiceMade(crossroads)

    return (
      <div>
        {loading && <p>Loading...</p>}
        {allowNewCrossroad &&
          <CreateCrossroad createCrossroad={createCrossroad} />}
        {
          !allowNewCrossroad &&
            <div>
              <CreateChoice
                createChoice={createChoice}
                crossroadId={crossroads.edges[0].node.id}
              />
              <CreateTest
                createTest={createTest}
                crossroadId={crossroads.edges[0].node.id}
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
  data: PropTypes.object.isRequired
}

export default StoryEditor
