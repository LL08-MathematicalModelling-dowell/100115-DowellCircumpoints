import React from "react";
import { descriptions } from "../util/constants";

export default function CanvasDimensionHelp() {
  const title = descriptions.canvasDimension.title;
  const { length, width } = descriptions.canvasDimension.description;
  return (
    <div className="descriptions-holder">
      <div className="help-title">{title}</div>
      <div>
        <ul>
          <li>{length}</li>
          <li>{width}</li>
        </ul>
      </div>
    </div>
  );
}
