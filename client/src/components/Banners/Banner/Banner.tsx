import React from "react";
import assignColour from "../../../utils/assignColour";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./banner.css";
import { connect } from "react-redux";

interface BannerProps {
  city: string;
  country: string;
  popularity: number;
  value: string | undefined;
}

const Banner = ({ city, country, popularity, value }) => {
  if (
    (typeof value === "string" &&
      (city.toLowerCase().includes(value) ||
        country.toLowerCase().includes(value))) ||
    typeof value === "undefined"
  ) {
    return (
      <div
        id="info"
        onClick={() => {
          window.location.replace(`/citypage/${city}`);
        }}
        style={{
          cursor: "pointer"
        }}
      >
        <section className={assignColour(popularity)}>
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                {city}, {country}
              </h1>
              <h2 className="subtitle">
                #{popularity} most popular destination in the world
              </h2>
              {/* <span id="heart" className="icon">
                        <FontAwesomeIcon icon={'heart'} />
                    </span> */}
            </div>
          </div>
        </section>
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state, ownProps) => {
  if (!(ownProps.id || ownProps.id === 0)) {
    const { city, popularity, country } = state.data.city;
    return { city, popularity, country };
  } else {
    const { city, popularity, country } = state.data.cities[ownProps.id];
    return {
      city,
      popularity,
      country,
      value: state.toggles.value
    };
  }
};

export default connect(mapStateToProps)(Banner);
