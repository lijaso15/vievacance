import React from "react";
import City from "./City";
import { connect } from "react-redux";

interface CitiesProps {
  citiesList: Array<{
    city: string;
    country: string;
    active: boolean;
  }>;
}

const Cities = ({ citiesList }: CitiesProps) => {
  return (
    <span className="select">
      <select>
        <option> City </option>
        {citiesList.map(pair => {
          return (
            <City
              title={pair.city + ", " + pair.country}
              active={pair.active}
            />
          );
        })}
      </select>
    </span>
  );
};

const mapStateToProps = state => {
  return {
    citiesList: state.data.cities
  };
};

export default connect(mapStateToProps)(Cities);
