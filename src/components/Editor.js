import R from 'ramda'
import React, { PropTypes } from 'react'

import CurrentPage from './CurrentPage'

const Editor = props => {
  const { data } = props
  const { loading } = data
  const currentPage = R.pathOr(
    {
      choices: { edges: [] },
      id: '',
      text: ''
    },
    ['getPageEditor', 'currentPage']
  )(data)

  return (<div>
    <CurrentPage {...currentPage} />
    {loading && <p>Loading...</p>}
  </div>)
}

Editor.propTypes = {
  data: PropTypes.object.isRequired
}

export default Editor
