import NavbarView from '../Navbar-view'
import axios from 'axios'
import PropTypes from 'prop-types'
import React from 'react'

const Navbar = ({ active, authenticationError, toggleSignInButton, toggleSignUpButton, setSignedIn, errorCleared, viewer }) => {
    return <NavbarView active={active}
        onProfileClick={() => {
            return active ? window.location.replace('/profile/' + viewer) :
                authenticationError()
        }} onSigninClick={() => {

            if (active) {
                // logout
                axios.get('/users/logout').catch(err => alert(err))
                setSignedIn(false)
                return
            } else {
                errorCleared()
                toggleSignInButton()
            }
        }} onSignupClick={() => toggleSignUpButton()} />
}

Navbar.propTypes = {
    active: PropTypes.bool.isRequired,
    authenticationError: PropTypes.func.isRequired,
    toggleSignInButton: PropTypes.func.isRequired,
    toggleSignUpButton: PropTypes.func.isRequired,
    setSignedIn: PropTypes.func.isRequired,
    errorCleared: PropTypes.func.isRequired,
    viewer: PropTypes.string.isRequired
}

export default Navbar

