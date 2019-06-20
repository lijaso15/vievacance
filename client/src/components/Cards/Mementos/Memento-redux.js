import Memento from './Memento-contianer'
import { connect } from 'react-redux'
import { updateData } from '../../../actions'


const mapStateToProps = state => {
    return {
        data: state.data.mementos,
        viewer: state.perspective.viewer,
        isEditing: state.toggles.editing,
        isDeleting: state.toggles.deleting,
        value: state.toggles.value
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateData: (data, label) => dispatch(updateData(data, label))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Memento)
