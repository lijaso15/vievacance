import { nextSlide, prevSlide } from '../../actions'
import { connect } from 'react-redux'
import Slideshow from './Slideshow-container'

const mapStateToProps = state => {
    return {
        position: state.position
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        nextSlide: (index) => {
            return dispatch(nextSlide(index))
        },
        prevSlide: (index) => {
            return dispatch(prevSlide(index))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Slideshow)