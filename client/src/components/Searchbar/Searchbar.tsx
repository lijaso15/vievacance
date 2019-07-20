import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { setFilter } from "../../actions";

const Searchbar = ({ setFilter }) => {
  return (
    <section className="hero is-medium">
      <div className="hero-body">
        <div className="container">
          <div className="field">
            <div className="control has-icons-right">
              <input
                onChange={e => {
                  const value = e.target.value;
                  setFilter(value);
                }}
                className="input is-rounded"
                type="text"
                placeholder="Filter by city or country"
              />
              <span className="icon is-small is-right">
                <FontAwesomeIcon icon="search" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setFilter: value => dispatch(setFilter(value))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Searchbar);
