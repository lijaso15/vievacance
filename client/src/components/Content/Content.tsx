import React from "react";
import "./content.css";
import { connect } from "react-redux";
import removeFootnotes from "../../utils/removeFootnotes";

interface ContentProps {
  images: string[];
  paragraphs: string[];
}

const Content = ({ images, paragraphs }: ContentProps) => {
  return (
    <div id="info">
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p> {paragraphs[0]}</p>
          </div>
        </div>
        <figure id="image" className="media-right">
          <p className="image" />
          <img alt="" src={images[0]} />
        </figure>
      </article>
      <article className="media">
        <figure id="image" className="media-left">
          <p className="image">
            <img alt="" src={images[1]} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p> {paragraphs[1]}</p>
          </div>
        </div>
      </article>
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p> {paragraphs[2]}</p>
          </div>
        </div>
        <figure id="image" className="media-right">
          <p className="image">
            <img alt="" src={images[2]} />
          </p>
        </figure>
      </article>
    </div>
  );
};

const mapStateToProps = state => {
  const { paragraphs, images } = state.data.city;
  return { paragraphs: paragraphs.map(p => removeFootnotes(p)), images };
};

export default connect(mapStateToProps)(Content);
