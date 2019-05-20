import React from 'react'
import PropTypes from 'prop-types'
import logo from '../../assets/logo.png'


const NavbarView = ({ active, onSignupClick, onSigninClick, onProfileClick }) => {

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" to="/homeglobe" href="/homeglobe">
                    <img src={logo} alt="" />
                </a>
            </div>
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <a className="navbar-item" href='/explore'>
                        Explore
                    </a>
                    <button className="navbar-item" onClick={onProfileClick}>
                        My Account
                    </button>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <button className="button is-primary" onClick={onSignupClick}>
                                <strong>Sign up</strong>
                            </button>

                            <button className={active ? "button is-link" : "button is-light"} onClick={onSigninClick}>
                                {active ? 'Sign out' : 'Sign in'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>)
}

NavbarView.propTypes = {
    active: PropTypes.bool.isRequired,
    onSignupClick: PropTypes.func.isRequired,
    onSigninClick: PropTypes.func.isRequired,
    onProfileClick: PropTypes.func.isRequired
}

export default NavbarView