import { connect } from 'react-redux'
import { skipTo } from '../../../actions'
import Dots from './Dots-container'


const mapStateToProps = state => {
    return {
        position: state.position
    }
}
const mapDispatchToProps = dispatch => {
    return {
        skipTo: index => dispatch(skipTo(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dots)