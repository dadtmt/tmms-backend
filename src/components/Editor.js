import R from 'ramda'
import React, { Component, PropTypes } from 'react'
import gql from 'graphql-tag'

import CurrentPage from './CurrentPage'

const updateToUpdateChoice = gql`
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

class Editor extends Component {
  componentWillReceiveProps(newProps) {
    const { data } = newProps
    const { loading } = data
    const hasCurrentPage = R.pipe(
      R.path(['getPageEditor', 'currentPage']),
      R.or(R.isNil, R.isEmpty),
      R.not
    )(data)
    if (!loading && hasCurrentPage) {
      const pageId = R.path(['getPageEditor', 'currentPage', 'id'])(data)
      this.subscription = data.subscribeToMore({
        document: updateToUpdateChoice,
        variables: {
          choiceFilter: {
            pageId: {
              eq: pageId
            }
          }
        }
      })
    }
  }
  render() {
    const { clearPageEditor, data } = this.props
    const { loading } = data
    const currentPage = R.pathOr(
      {
        choices: { edges: [] },
        id: '',
        text: ''
      },
      ['getPageEditor', 'currentPage']
    )(data)
    const isChoiceMade = R.pipe(
      R.path(['choices', 'edges']),
      R.map(R.path(['node', 'made'])),
      R.reduce(
        R.or,
        false
      )
    )(currentPage)

    return (<div>
      <CurrentPage {...currentPage} />
      {
        isChoiceMade &&
          <button type='button' onClick={clearPageEditor} >New page</button>
      }
      {loading && <p>Loading...</p>}
    </div>)
  }
}

Editor.propTypes = {
  clearPageEditor: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

export default Editor
