import R from 'ramda'
import React, { PropTypes } from 'react'

import PageChoices from './PageChoices'
import SubmitChoice from '../containers/SubmitChoice'
import SubmitPage from '../containers/SubmitPage'

const CurrentPage = ({ id, choices }) => <div>
  <SubmitPage currentPageId={id} />
  {!R.isEmpty(id) && <SubmitChoice currentPageId={id} />}
  {!R.isEmpty(choices) && <PageChoices choices={choices} />}
</div>

CurrentPage.propTypes = {
  choices: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired
}

export default CurrentPage
