import React from "react";
import Slideshow from "../../../Slideshow";
import Edit from "../Edit";
import { MementoProps } from "../../../../types";
import Modal from "../Modal";

class Memento extends React.Component<MementoProps> {
  render() {
    const {
      owner,
      photos,
      title,
      description,
      value,
      onClick,
      slideNumber,
      fullAccess
    } = this.props;
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
              id={slideNumber}
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
          <Modal {...this.props} />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Memento;
