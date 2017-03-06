import R from 'ramda'
import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
import { propType } from 'graphql-anywhere'

import RichTextEditor from './RichTextEditor'
import { crossroadFragment } from '../graphql/fragments'

const CreateCrossroad = ({ createCrossroad, crossroad, updateCrossroadText }) =>
<Panel
  header='Add or Edit Page'
>
  <RichTextEditor
    handleSave={
      text => crossroad
        ? updateCrossroadText({
          id: crossroad.id,
          text
        })
        : createCrossroad(text)
    }
    text={R.propOr(null, 'text', crossroad)}
  />
</Panel>

CreateCrossroad.fragments = {
  crossroad: crossroadFragment
}

CreateCrossroad.propTypes = {
  createCrossroad: PropTypes.func.isRequired,
  crossroad: propType(CreateCrossroad.fragments.crossroad),
  updateCrossroadText: PropTypes.func.isRequired
}

export default CreateCrossroad
