import Navbar from '../Navbar-view'
import { connect } from 'react-redux'
import axios from 'axios'
import React from 'react'
import { userHasLoggedOut, authenticationError } from '../../../actions'

const NavbarOther = ({ authenticationError, active, userHasLoggedOut }) => {

    return <Navbar active={active} onSignupClick={() => {
        return window.location.replace('/homeglobe')
    }} onSigninClick={() => {
        if (active) {
            axios.get('/users/logout').catch(err => alert(err))
            userHasLoggedOut()
            return
        } else {
            return window.location.replace('/homeglobe')
        }
    }} onProfileClick={() => {
        if (active) {
            return window.location.replace('/profile')
        } else {
            authenticationError()
            return window.location.replace('/homeglobe')
        }
    }} />
}

const mapStateToProps = state => {
    return {
        active: state.toggles.navbar
    }
}


const mapDispatchToProps = dispatch => {
    return {
        authenticationError: () => dispatch(authenticationError()),
        userHasLoggedOut: () => dispatch(userHasLoggedOut())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavbarOther)