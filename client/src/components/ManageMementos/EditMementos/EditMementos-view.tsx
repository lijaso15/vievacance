import React from "react";
import PhotoCards from "../../Cards/PhotoCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cities from "../Cities";

const EditMementosView = ({
  owner,
  description,
  profilePicture,
  username,
  editMemento,
  onClick,
  message
}) => {
  return (
    <div className="modal-content">
      <header
        className="modal-card-head"
        style={{
          paddingBottom: "6px"
        }}
      >
        <p className="modal-card-title">
          <article className="media">
            <figure className="media-left">
              <p
                className="image"
                style={{
                  width: "2.25em",
                  height: "2.25em",
                  objectFit: "cover"
                }}
              >
                <img
                  className="is-rounded"
                  src={profilePicture}
                  style={{
                    borderColor: "rgb(0, 209, 178)",
                    borderStyle: "groove"
                  }}
                />
              </p>
            </figure>
            <div className="media-content">
              <div className="content" style={{ paddingTop: "1rem" }}>
                <a href={`/profile/${owner}`}> {username} </a>
              </div>
            </div>
          </article>
        </p>
      </header>

      <div className="modal-card-body">
        <div className="field">
          <p className="control has-icons-left">
            <Cities />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon="globe" />
            </span>
          </p>
        </div>
        <PhotoCards owner={owner} />

        <div className="control">
          <textarea className="textarea is-primary" placeholder="description">
            {description}
          </textarea>
        </div>
        {message ? (
          <article
            className={
              message === "Success!"
                ? "message is-success is-small"
                : "message is-danger is-small"
            }
          >
            <div className="message-body">{message}</div>
          </article>
        ) : null}
      </div>
      <footer className="modal-card-foot">
        <button id="info" className="button" onClick={onClick}>
          Cancel
        </button>
        <button id="info" className="button is-primary" onClick={editMemento}>
          Edit Memento
        </button>
      </footer>
    </div>
  );
};

export default EditMementosView;
