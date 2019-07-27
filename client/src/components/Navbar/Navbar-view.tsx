import React from "react";
import PropTypes from "prop-types";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { connect } from "react-redux";
import { toggleBurger } from "../../actions";

const NavbarView = ({
  active,
  onSignupClick,
  onSigninClick,
  onProfileClick,
  burgerActive,
  toggleBurger
}) => {
  return (
    <nav
      id="navbar"
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <span className="navbar-brand">
        <a className="navbar-item" href="/homeglobe">
          <img src={logo} alt="" />
        </a>
        <a
          role="button"
          className={
            burgerActive
              ? "navbar-burger burger is-active"
              : "navbar-burger burger"
          }
          onClick={() => toggleBurger()}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </span>

      <div
        id="navbarBasicExample"
        className={burgerActive ? "navbar-menu is-active" : "navbar-menu"}
      >
        <div className="navbar-start">
          <a className="navbar-item" href="/explore">
            Explore
          </a>
          <a
            className="navbar-item"
            onClick={onProfileClick}
            href="javascript:function() { return false; }"
          >
            My Account
          </a>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-primary" onClick={onSignupClick}>
                <strong>Sign up</strong>
              </button>

              <button
                className={active ? "button is-link" : "button is-light"}
                onClick={onSigninClick}
              >
                {active ? "Sign out" : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

NavbarView.propTypes = {
  active: PropTypes.bool.isRequired,
  onSignupClick: PropTypes.func.isRequired,
  onSigninClick: PropTypes.func.isRequired,
  onProfileClick: PropTypes.func.isRequired,
  burgerActive: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    toggleBurger: () => dispatch(toggleBurger())
  };
};

const mapStateToProps = state => {
  return {
    burgerActive: state.toggles.burger
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarView);
