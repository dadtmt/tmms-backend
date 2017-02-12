import R from 'ramda'
import React, { PropTypes } from 'react'

import PageChoices from './PageChoices'
import SubmitChoice from '../containers/SubmitChoice'
import SubmitPage from '../containers/SubmitPage'

const CurrentPage = ({ id, text, choices }) => <div>
  <SubmitPage currentPageId={id} currentPageText={text} />
  {!R.isEmpty(id) && <SubmitChoice currentPageId={id} />}
  {!R.isEmpty(choices.edges) && <PageChoices choices={choices.edges} />}
</div>

CurrentPage.propTypes = {
  choices: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired
}

export default CurrentPage
