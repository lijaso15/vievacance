import MementoView from "./Memento-view";
import React from "react";
import axios from "axios";

const Memento = ({
  data,
  updateData,
  viewer,
  fullAccess,
  isEditing,
  isDeleting,
  value
}) => {
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
              <MementoView
                owner={mem.owner}
                photos={mem.photos}
                numPhotos={mem.photos.length}
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
                remove={() => {
                  axios.delete(`/mementos/user/${mem.id}`);
                  window.location.reload();
                }}
                value={value.toLowerCase()}
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

export default Memento;
