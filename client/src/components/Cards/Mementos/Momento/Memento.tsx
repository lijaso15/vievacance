import React from "react";
import Slideshow from "../../../Slideshow";
import Edit from "../Edit";
import EditMementos from "../../../ManageMementos/EditMementos";
import axios from "axios";

interface MementoProps {
  owner: string;
  photos: Array<{
    title: string;
    subtitle: string;
    image: string;
  }>;
  title: string;
  description: string;
  active: boolean;
  onClick(): any;
  isEditing: boolean;
  isDeleting: boolean;
  fullAccess: boolean;
  value: string | undefined;
  profilePicture: string;
  username: string;
  _id: string;
  id: number;
}

const Memento = ({
  owner,
  photos,
  title,
  description,
  active,
  onClick,
  id,
  fullAccess,
  isEditing,
  isDeleting,
  value,
  profilePicture,
  username,
  _id
}: MementoProps) => {
  if (
    (typeof value === "string" && title.toLowerCase().includes(value)) ||
    typeof value === "undefined"
  ) {
    return (
      <div
        className="column is-one-quarter"
        style={{
          borderStyle: "groove",
          backgroundColor: "white"
        }}
      >
        <figure
          onClick={onClick}
          id="info"
          className="image container"
          style={{ width: "100%" }}
        >
          <Slideshow
            slides={photos.map(p => {
              return {
                title: "",
                subtitle: "",
                image: `/photos/${owner}/${p}`
              };
            })}
            id={id}
            isBox={true}
          />
          <a
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "hsl(0, 0%, 96%)"
            }}
            className="subtitle"
            href={`/citypage/${title.split(",")[0]}`}
          >
            {" "}
            {title}
          </a>

          {fullAccess ? <Edit /> : null}
        </figure>
        <div
          className="content is-small"
          style={{
            backgroundColor: "hsl(0, 0%, 96%)",
            margin: 0
          }}
        >
          {description.length > 150
            ? description.slice(0, 150) + "..."
            : description}
        </div>
        <div className={active ? "modal is-active" : "modal"}>
          <div onClick={onClick} className="modal-background" />
          {isDeleting ? (
            <div className="modal-content">
              <header className="modal-card-head">
                {" "}
                <p className="modal-card-title">Confirm Delete</p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={onClick}
                />
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
              <EditMementos
                owner={owner}
                photos={photos}
                title={title}
                description={description}
                id={id}
                profilePicture={profilePicture}
                username={username}
                onClick={onClick}
                _id={_id}
              />
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
                id={id}
                isModal={true}
              />
              <footer className="modal-card-foot">{description}</footer>
            </div>
          )}
          <button
            onClick={onClick}
            className="modal-close is-large"
            aria-label="close"
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Memento;
