import { connect } from 'react-redux'
import { authenticationError, toggleSignInButton, toggleSignUpButton, userHasLoggedOut, errorCleared } from '../../../actions'
import Navbar from './Navbar-container'

const mapStateToProps = state => {
    return {
        active: state.toggles.navbar
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticationError: () => dispatch(authenticationError()),
        toggleSignInButton: () => dispatch(toggleSignInButton()),
        toggleSignUpButton: () => dispatch(toggleSignUpButton()),
        userHasLoggedOut: () => dispatch(userHasLoggedOut()),
        errorCleared: () => dispatch(errorCleared())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)