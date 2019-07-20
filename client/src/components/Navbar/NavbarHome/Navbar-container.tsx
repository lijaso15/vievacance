import NavbarView from "../Navbar-view";
import PropTypes from "prop-types";
import React from "react";
import logout from "../../../utils/logout";

const Navbar = ({
  active,
  authenticationError,
  toggleSignInButton,
  toggleSignUpButton,
  setSignedIn,
  errorCleared,
  viewer
}) => {
  return (
    <NavbarView
      active={active}
      onProfileClick={() => {
        return active
          ? window.location.replace("/profile/" + viewer)
          : authenticationError();
      }}
      onSigninClick={() => {
        if (active) {
          // logout
          setSignedIn(false);
          logout(false);
          return;
        } else {
          errorCleared();
          toggleSignInButton();
        }
      }}
      onSignupClick={() => toggleSignUpButton()}
    />
  );
};

Navbar.propTypes = {
  active: PropTypes.bool.isRequired,
  authenticationError: PropTypes.func.isRequired,
  toggleSignInButton: PropTypes.func.isRequired,
  toggleSignUpButton: PropTypes.func.isRequired,
  setSignedIn: PropTypes.func.isRequired,
  errorCleared: PropTypes.func.isRequired,
  viewer: PropTypes.string.isRequired
};

export default Navbar;
