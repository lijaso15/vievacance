import React from "react";

interface CityProps {
  title: string;
  active: boolean;
}

const City = ({ title, active }: CityProps) => {
  return active ? (
    <option selected> {title} </option>
  ) : (
    <option> {title} </option>
  );
};

export default City;
