import Edit from './Edit-container'
import { connect } from 'react-redux'
import { setEditing, setDeleting } from '../../../../actions'

const mapDispatchToProps = dispatch => {
    return {
        setDeleting: () => dispatch(setDeleting()),
        setEditing: () => dispatch(setEditing())
    }
}


export default connect(null, mapDispatchToProps)(Edit)