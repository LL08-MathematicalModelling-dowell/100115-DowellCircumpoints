import React from "react";
import { descriptions } from "../util/constants";

export default function DataTypeHelp() {
  const title = descriptions.dataType.title;
  const { general, cartesian, geocoordinate } =
    descriptions.dataType.description;
  return (
    <div className="descriptions-holder">
      <div className="help-title">{title}</div>
      <div>{general}</div>
      <div>
        <ul>
          <li>{cartesian}</li>
          <li>{geocoordinate}</li>
        </ul>
      </div>
    </div>
  );
}
