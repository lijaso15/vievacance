import React from "react";

interface PhotoCardProps {
  owner: string;
  id: string;
  onClick(): any;
  active: boolean;
}

const PhotoCard = ({ owner, id, onClick, active }: PhotoCardProps) => {
  return (
    <div className="column is-one-quarter" onClick={onClick}>
      <figure className="image container" style={{ width: "100%" }}>
        <img
          style={{
            borderStyle: "groove"
          }}
          src={`/photos/${owner}/${id}`}
          alt=""
        />
        <input
          className="check"
          defaultChecked={active}
          type="checkbox"
          style={{ position: "absolute", right: "4px", bottom: "4px" }}
        />
      </figure>
    </div>
  );
};

export default PhotoCard;
