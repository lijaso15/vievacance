import React from "react";

interface SlideProps {
  image: string;
  isBox: boolean;
  isModal: boolean;
}
const Slide = ({ image, isBox, isModal }: SlideProps) => {
  return (
    <div className={isBox ? "image is-square" : ""}>
      <img
        style={
          isBox
            ? {
                objectFit: "cover"
              }
            : isModal
            ? {
                width: "100%",
                objectFit: "contain",
                borderStyle: "groove"
              }
            : {
                top: 0,
                left: 0,
                width: "100%",
                objectFit: "cover",
                height: "-webkit-fill-available"
              }
        }
        alt=""
        src={image}
      />
    </div>
  );
};

export default Slide;
