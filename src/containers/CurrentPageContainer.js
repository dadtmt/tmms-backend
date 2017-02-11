import { connect } from 'react-redux'
import CurrentPage from '../components/CurrentPage'

const mapStateToProps = state => ({ ...state.editor.currentPage })

export default connect(mapStateToProps)(CurrentPage)
