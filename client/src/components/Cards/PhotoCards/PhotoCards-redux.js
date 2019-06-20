import PhotoCards from './PhotoCards-container.js'
import { connect } from 'react-redux'
import { loadData } from '../../../actions'

const mapStateToProps = state => {
    return {
        photos: state.data.photos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateData: (data, label) => dispatch(loadData(data, label))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PhotoCards)