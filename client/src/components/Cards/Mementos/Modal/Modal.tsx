import React from "react";
import { MementoProps } from "../../../../types";
import EditMementos from "../../../ManageMementos/EditMementos";
import axios from "axios";
import Like from "../Momento/Like";
import Slideshow from "../../../Slideshow";

class Modal extends React.Component<MementoProps> {
  render() {
    const {
      active,
      onClick,
      isEditing,
      isDeleting,
      _id,
      profilePicture,
      description,
      owner,
      photos,
      slideNumber,
      username
    } = this.props;
    return (
      <div className={active ? "modal is-active" : "modal"}>
        <div onClick={onClick} className="modal-background" />
        {isDeleting ? (
          <div className="modal-content">
            <header className="modal-card-head">
              {" "}
              <p className="modal-card-title">Confirm Delete</p>
              <button className="delete" aria-label="close" onClick={onClick} />
            </header>

            <footer className="modal-card-foot">
              <button className="button is-active" onClick={onClick}>
                {" "}
                Cancel{" "}
              </button>
              <button
                className="button is-danger"
                onClick={() => {
                  axios.delete(`/mementos/user/${_id}`);
                  window.location.reload();
                }}
              >
                {" "}
                Delete{" "}
              </button>
            </footer>
          </div>
        ) : isEditing ? (
          <div className="modal-content">
            <EditMementos {...this.props} />
          </div>
        ) : (
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
                      className="image is-square"
                      style={{
                        width: "2.25em",
                        height: "2.25em"
                      }}
                    >
                      <img
                        className="is-rounded"
                        src={profilePicture}
                        style={{
                          borderColor: "rgb(0, 209, 178)",
                          borderStyle: "groove",
                          objectFit: "cover"
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
            <Slideshow
              slides={photos.map(p => {
                return {
                  title: "",
                  subtitle: "",
                  image: `/photos/${owner}/${p}`
                };
              })}
              id={slideNumber}
              isModal={true}
            />
            <footer
              style={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0
              }}
              className="modal-card-foot"
            >
              {description}
            </footer>
            <div className="modal-card-body">
              <Like {...this.props} />
            </div>
          </div>
        )}
        <button
          onClick={onClick}
          className="modal-close is-large"
          aria-label="close"
        />
      </div>
    );
  }
}

export default Modal;
