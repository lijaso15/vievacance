import Searchbar from './Searchbar-container'
import { connect } from 'react-redux'
import { setFilter } from '../../actions'


const mapDispatchToProps = dispatch => {
    return {
        setFilter: value => dispatch(setFilter(value))
    }
}


export default connect(null, mapDispatchToProps)(Searchbar)