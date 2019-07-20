import EditMementos from './EditMementos-container'
import { loadData, setError } from '../../../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        selectedPhotos: state.data.photos.filter(p => p.active),
        cities: state.data.cities,
        wasCalled: state.err.edit,
        message: state.err.message
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loadData: (id, label) => dispatch(loadData(id, label)),
        setError: (label, message) => dispatch(setError(label, message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMementos)  