import { connect } from 'react-redux'
import { authenticationError, toggleSignInButton, toggleSignUpButton, setSignedIn, errorCleared } from '../../../actions'
import Navbar from './Navbar-container'

const mapStateToProps = state => {
    return {
        active: state.toggles.navbar,
        viewer: state.perspective.viewer ? state.perspective.viewer : ''
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticationError: () => dispatch(authenticationError()),
        toggleSignInButton: () => dispatch(toggleSignInButton()),
        toggleSignUpButton: () => dispatch(toggleSignUpButton()),
        setSignedIn: (id) => dispatch(setSignedIn(id)),
        errorCleared: () => dispatch(errorCleared())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)