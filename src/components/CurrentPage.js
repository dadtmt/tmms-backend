import R from 'ramda'
import React, { PropTypes } from 'react'

import ChoiceEditor from './ChoiceEditor'
import PageChoices from './PageChoices'
import PageEditor from './PageEditor'


const CurrentPage = ({ id, text, choices, createPage, createChoice }) => <div>
  <PageEditor
    currentPageId={id}
    currentPageText={text}
    handleSave={createPage}
  />
  {
    !R.isEmpty(id) &&
      <ChoiceEditor currentPageId={id} handleSave={createChoice} />
  }
  <PageChoices choices={choices} />
</div>

CurrentPage.propTypes = {
  choices: PropTypes.shape({
    edges: PropTypes.array.isRequired
  }).isRequired,
  createChoice: PropTypes.func.isRequired,
  createPage: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default CurrentPage
