import React from "react";
import { connect } from "react-redux";
import { skipTo } from "../../../actions";

interface DotProps {
  onClick(): any;
  active: boolean;
  isHorizontal: boolean;
}

const Dot = ({ onClick, active, isHorizontal }: DotProps) => {
  return (
    <span
      style={{
        cursor: "pointer",
        height: "15px",
        width: "15px",
        margin: "0 2px",
        borderRadius: "50%",
        display: isHorizontal ? "inline-block" : "block",
        transition: "background-color 0.6s ease",
        backgroundColor: active ? "grey" : "#bbb"
      }}
      onClick={onClick}
    >
      {" "}
    </span>
  );
};

interface DotsProps {
  numSlides: number;
  position: number;
  isHorizontal: boolean;
  id: number;
  skipTo: any;
  orientation: object;
}

const Dots = ({
  numSlides,
  skipTo,
  position,
  isHorizontal,
  id,
  orientation
}: DotsProps) => {
  const arr = [...Array(numSlides).keys()];
  return (
    <div style={orientation}>
      {arr.map((value, index) => {
        return (
          <Dot
            isHorizontal={isHorizontal}
            key={index}
            active={position === index}
            onClick={() => {
              skipTo(index, id);
            }}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    position: state.position[ownProps.id]
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    skipTo: index => dispatch(skipTo(index, ownProps.id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dots);
