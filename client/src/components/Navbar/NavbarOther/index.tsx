import Navbar from "../Navbar-view";
import { connect } from "react-redux";
import React from "react";
import { setSignedIn, authenticationError } from "../../../actions";
import logout from "../../../utils/logout";

const NavbarOther = ({ authenticationError, active, setSignedIn, viewer }) => {
  return (
    <Navbar
      active={active}
      onSignupClick={() => {
        return window.location.replace("/homeglobe");
      }}
      onSigninClick={() => {
        if (active) {
          setSignedIn(false);
          logout(false);
          return;
        } else {
          return window.location.replace("/homeglobe");
        }
      }}
      onProfileClick={() => {
        if (active) {
          return window.location.replace("/profile/" + viewer);
        } else {
          authenticationError();
          return window.location.replace("/homeglobe");
        }
      }}
    />
  );
};

const mapStateToProps = state => {
  return {
    active: state.toggles.navbar,
    viewer: state.perspective.viewer ? state.perspective.viewer : ""
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticationError: () => dispatch(authenticationError()),
    setSignedIn: id => dispatch(setSignedIn(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarOther);
