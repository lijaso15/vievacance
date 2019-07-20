import Memento from "./Momento";
import React from "react";
import { connect } from "react-redux";
import { updateData } from "../../../actions";

type data = Array<{
  owner: string;
  photos: Array<{
    title: string;
    subtitle: string;
    image: string;
  }>;
  city: string;
  country: string;
  description: string;
  active: boolean;
  profilePicture: string;
  username: string;
  _id: string;
  id: string;
}>;

interface MementosProps {
  data: data;
  updateData(data: data, label: string): any;
  viewer: boolean | string;
  fullAccess: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  value: string | undefined;
}

const Mementos = ({
  data,
  updateData,
  viewer,
  fullAccess,
  isEditing,
  isDeleting,
  value
}: MementosProps) => {
  if (!data.length) {
    if (viewer) {
      return (
        <div className="column">
          {" "}
          <article className="message is-warning is-small">
            <div className="message-body">
              You do not have any mementos.
              <a href={"/mementos/" + viewer}> click here </a>
              to create one
            </div>
          </article>
        </div>
      );
    } else {
      return (
        <div className="column">
          {" "}
          <article className="message is-warning is-small">
            <div className="message-body">
              You do not have any mementos.
              <a href={"/homeglobe"}> click here </a>
              to create one
            </div>
          </article>
        </div>
      );
    }
  } else {
    return (
      <div className="column">
        <div id="info" className="columns is-gapless is-multiline is-mobile">
          {data.map((mem, id) => {
            return (
              <Memento
                owner={mem.owner}
                photos={mem.photos}
                title={mem.city + ", " + mem.country}
                description={mem.description}
                active={mem.active}
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
                id={id}
                fullAccess={fullAccess}
                value={value ? value.toLowerCase() : undefined}
                profilePicture={mem.profilePicture}
                username={mem.username}
                _id={mem.id}
              />
            );
          })}
        </div>
      </div>
    );
  }
};

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
