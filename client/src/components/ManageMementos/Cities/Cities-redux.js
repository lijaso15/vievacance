import Cities from './Cities-container'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        citiesList: state.data.cities
    }
}

export default connect(mapStateToProps)(Cities) 