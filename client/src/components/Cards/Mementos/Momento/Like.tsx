import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setToggle } from "../../../../actions";
import { connect } from "react-redux";
// import Seachbar from "../../../Searchbar";
import { LikeProps, LikeState } from "../../../../types";
import axios from "axios";
import { setError } from "../../../../actions";
import Message from "../../../Message";

class Like extends React.Component<LikeProps, LikeState> {
  constructor(props) {
    super(props);
    this.like = this.like.bind(this);
    this.state = {
      likes: this.props.likes
    };
  }

  like() {
    const { showMessage, toggleActive, active, _id, viewer } = this.props;
    if (viewer) {
      toggleActive();
      if (active) {
        //unlike
      } else {
        // like
        axios.post(`/mementos/like/${viewer}/${_id}`).catch(err => alert(err));
        this.setState({
          likes: this.state.likes.concat([String(viewer)])
        });
      }
    } else {
      showMessage();
    }
  }

  render() {
    const { active, messageIsActive } = this.props;
    const { likes } = this.state;
    return (
      <div>
        {" "}
        <span
          className="icon"
          onClick={this.like}
          style={{
            cursor: "pointer",
            color: active ? "red" : ""
          }}
        >
          {active ? (
            <FontAwesomeIcon icon="heart" />
          ) : (
            <FontAwesomeIcon icon={["far", "heart"]} />
          )}
        </span>{" "}
        <span>{likes ? likes.length : 0} people like this.</span>
        {messageIsActive && (
          <Message
            viewer={this.props.viewer}
            message={[
              "You must be logged in to like this post",
              "to login or create an account"
            ]}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (ownProps.likes) {
    return {
      active: state.perspective.viewer
        ? ownProps.likes.includes(state.perspective.viewer)
        : false,
      viewer: state.perspective.viewer,
      messageIsActive: state.err.like
    };
  } else {
    return {
      active: false,
      viewer: state.perspective.viewer,
      messageIsActive: state.err.like
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    toggleActive: () => dispatch(setToggle("LIKE")),
    showMessage: () => dispatch(setError("ERR_LIKE"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Like);
