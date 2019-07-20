import PhotoCard from "./PhotoCard/PhotoCard";
import React from "react";
import { connect } from "react-redux";
import { loadData } from "../../../actions";

type photos = Array<{
  id: string;
  active: boolean;
}>;

interface PhotoCardsProps {
  photos: photos;
  owner: string;
  updateData(data: photos, label: string): any;
}

const PhotoCards = ({ photos, owner, updateData }: PhotoCardsProps) => {
  if (!photos.length) {
    return (
      <div className="column">
        {" "}
        <article className="message is-warning is-small">
          <div className="message-body">
            You do not have any photos.
            <a href={"/settings/" + owner}> click here </a>
            to upload
          </div>
        </article>
      </div>
    );
  } else {
    return (
      <div id="info" className="columns is-gapless is-multiline is-mobile">
        {photos.map(photo => {
          return (
            <PhotoCard
              onClick={() =>
                updateData(
                  photos.map(p =>
                    p.id === photo.id ? { ...p, active: !p.active } : p
                  ),
                  "PHOTOS"
                )
              }
              {...photo}
              owner={owner}
            />
          );
        })}
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    photos: state.data.photos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateData: (data, label) => dispatch(loadData(data, label))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoCards);
