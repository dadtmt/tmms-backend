import R from 'ramda'
import React, { Component, PropTypes } from 'react'
import gql from 'graphql-tag'

import CreateChoice from './CreateChoice'
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

export const isChoiceMade = R.pipe(
  R.prop('edges'),
  R.head,
  R.pathOr([], ['node', 'choices', 'edges']),
  R.map(R.path(['node', 'made'])),
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
      this.subscription = data.subscribeToMore({
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
    }
  }

  render() {
    const { createChoice, createCrossroad, data } = this.props
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
            <CreateChoice
              createChoice={createChoice}
              crossroadId={crossroads.edges[0].node.id}
            />
        }
        <Crossroads crossroads={crossroads} header='What the player see:' />
      </div>
    )
  }
}

StoryEditor.propTypes = {
  createChoice: PropTypes.func.isRequired,
  createCrossroad: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

export default StoryEditor
