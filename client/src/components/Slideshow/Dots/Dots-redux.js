import { connect } from 'react-redux'
import { skipTo } from '../../../actions'
import Dots from './Dots-container'


const mapStateToProps = (state, ownProps) => {
    return {
        position: state.position[ownProps.id]
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        skipTo: (index) => dispatch(skipTo(index, ownProps.id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dots)