import React from "react";
import { descriptions } from "../util/constants";

export default function ShapeTypeHelp() {
  const title = descriptions.shapeType.title;
  const { general } = descriptions.shapeType.description;
  return (
    <div className="descriptions-holder">
      <div className="help-title">{title}</div>
      <div>{general}</div>
    </div>
  );
}
