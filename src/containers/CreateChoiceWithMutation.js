import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'

import CreateChoice from '../components/CreateChoice'

const selector = getFormValues('content')

const mapStateToProps = (state, { createChoice }) => ({
  submitChoice: values => createChoice({
    content: selector(state),
    ...values
  })
})

export default connect(mapStateToProps)(CreateChoice)
