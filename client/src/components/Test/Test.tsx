import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setToggle } from "../../actions";
import { connect } from "react-redux";
import Seachbar from "../Searchbar";

const Test = ({ active, toggleActive, likes = ["a", "b", "c"], like }) => {
  return (
    <div>
      <div
        style={{
          cursor: "pointer"
        }}
      >
        {" "}
        <span className="icon" onClick={like}>
          <FontAwesomeIcon icon={["far", "heart"]} />
        </span>{" "}
        <span onClick={toggleActive}>
          {likes ? likes.length : 0} people like this.
        </span>
      </div>
      <div className={active ? "modal-is-active" : "modal"}>
        <div className="modal-background" />

        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Likes </p>
            <button
              className="delete"
              aria-label="close"
              onClick={toggleActive}
            />
          </header>
          <section className="modal-card-body">
            <Seachbar />
            <ul>
              {likes.map(user => (
                <li> {user} </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    active: state.toggles.test
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleActive: () => dispatch(setToggle("TEST"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
