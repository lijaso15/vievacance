import Banner from "./Banner-container";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  if (!(ownProps.id || ownProps.id === 0)) {
    const { city, popularity, country } = state.data.city;
    return {
      onLoad: { city, popularity, country }
    };
  } else {
    const { city, popularity, country } = state.data.cities[ownProps.id];
    return {
      onLoad: { city, popularity, country },
      value: state.toggles.value
    };
  }
};

export default connect(mapStateToProps)(Banner);
