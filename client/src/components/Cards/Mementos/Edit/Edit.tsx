import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { setEditing, setDeleting } from "../../../../actions";

interface EditProps {
  setEditing(): any;
  setDeleting(): any;
}

const Edit = ({ setEditing, setDeleting }: EditProps) => {
  return (
    <div
      className="dropdown is-hoverable"
      style={{
        position: "absolute",
        bottom: 0,
        right: 0
      }}
    >
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu4"
        >
          <FontAwesomeIcon icon={"edit"} size="lg" />
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu4" role="menu">
        <div className="dropdown-content">
          <a
            href="javascript:function() { return false; }"
            onClick={() => {
              setEditing();
            }}
            className="dropdown-item"
          >
            edit
          </a>
          <a
            href="javascript:function() { return false; }"
            onClick={() => setDeleting()}
            className="dropdown-item"
          >
            delete
          </a>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setDeleting: () => dispatch(setDeleting()),
    setEditing: () => dispatch(setEditing())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Edit);
