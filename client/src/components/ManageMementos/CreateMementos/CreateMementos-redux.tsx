import CreateMementos from './CreateMementos-container'
import { connect } from 'react-redux'
import { setError } from '../../../actions'

const mapStateToProps = state => {
    return {
        owner: state.perspective.owner._id,
        selectedPhotos: state.data.photos.filter(p => p.active),
        cities: state.data.cities,
        message: state.err.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setError: (label, message) => dispatch(setError(label, message))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CreateMementos) 
