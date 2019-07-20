import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cities from "../Cities";
import PhotoCards from "../../Cards/PhotoCards";

const CreateMementosView = ({ owner, createMemento, message }) => {
  return (
    <div className="column is-three-quarters">
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Create your Memento</h1>
          </div>
        </div>
      </section>
      {/* <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
            <ul>
                <li> <span className="tag is-link">City</span> </li>
                <li> <span className="tag is-link">Photos</span> </li>
                <li> <span className="tag is-link">Description</span> </li>
            </ul>
        </nav> */}

      <div className="field">
        <label
          style={{
            borderBottom: "3px solid #fafafa"
          }}
          className="label"
        >
          Select a City
        </label>
        <p className="control has-icons-left">
          <Cities />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon="globe" />
          </span>
        </p>
      </div>

      <label
        style={{
          borderBottom: "3px solid #fafafa"
        }}
        className="label"
      >
        Select photos
      </label>

      <PhotoCards owner={owner} />

      <label
        style={{
          borderBottom: "3px solid #fafafa"
        }}
        className="label"
      >
        Add Description{" "}
      </label>

      <div className="control">
        <textarea className="textarea is-primary" placeholder="description" />
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
      <button id="info" className="button is-primary" onClick={createMemento}>
        Post Memento
      </button>
    </div>
  );
};

export default CreateMementosView;
