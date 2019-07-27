import Memento from "./Momento";
import React from "react";
import { connect } from "react-redux";
import { updateData } from "../../../actions";
import Message from "../../Message";
import { MementosProps } from "../../../types";

class Mementos extends React.Component<MementosProps> {
  render() {
    const {
      data,
      updateData,
      viewer,
      fullAccess,
      isEditing,
      isDeleting,
      value
    } = this.props;
    if (!data.length) {
      return (
        <Message
          viewer={viewer}
          message={["You do not have any mementos.", "to create one"]}
        />
      );
    } else {
      return (
        <div className="column">
          <div id="info" className="columns is-gapless is-multiline is-mobile">
            {data.map((mem, id) => {
              return (
                <Memento
                  {...mem}
                  title={mem.city + ", " + mem.country}
                  onClick={() => {
                    updateData(
                      data.map(m => {
                        return m._id === mem._id
                          ? { ...m, active: !m.active }
                          : m;
                      }),
                      "MEMENTOS"
                    );
                  }}
                  isEditing={isEditing}
                  isDeleting={isDeleting}
                  slideNumber={id}
                  fullAccess={fullAccess}
                  value={value ? value.toLowerCase() : undefined}
                />
              );
            })}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    data: state.data.mementos,
    viewer: state.perspective.viewer,
    isEditing: state.toggles.editing,
    isDeleting: state.toggles.deleting,
    value: state.toggles.value
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateData: (data, label) => dispatch(updateData(data, label))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mementos);
