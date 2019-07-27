import React from "react";
import Slide from "./Slide/Slide";
import Dots from "./Dots";
import Caption from "./Caption";
import { nextSlide, prevSlide } from "../../actions";
import { connect } from "react-redux";

interface SlideshowProps {
  slides: Array<{
    title: string;
    subtitle: string;
    image: string;
  }>;
  nextSlide(id: number): any;
  position: number;
  id: number;
  isBox: boolean;
  isModal: boolean;
}

const Slideshow = ({
  slides,
  nextSlide,
  position,
  id,
  isBox,
  isModal
}: SlideshowProps) => {
  return (
    <div className={isModal ? "modal-card-body" : ""}>
      <div
        onClick={() => {
          if (position < slides.length - 1 && !isBox) {
            nextSlide(id);
          }
        }}
      >
        <Slide image={slides[position].image} isBox={isBox} isModal={isModal} />
        <Caption
          title={slides[position].title}
          subtitle={slides[position].subtitle}
        />
      </div>
      <Dots
        orientation={
          isModal
            ? {
                textAlign: "center"
              }
            : {
                top: "40%",
                position: "absolute",
                right: 0
              }
        }
        numSlides={slides.length}
        id={id}
        isHorizontal={isModal}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    position: state.position[ownProps.id]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    nextSlide: index => {
      return dispatch(nextSlide(index));
    },
    prevSlide: index => {
      return dispatch(prevSlide(index));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slideshow);
