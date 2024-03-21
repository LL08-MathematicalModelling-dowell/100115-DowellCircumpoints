import React, { useState } from "react";
import { abouts } from "./util/constants";
import "./util/styles.css";

export default function About({ about }) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="about-section-container">
      <div
        className="about-section"
        onClick={() => {
          setIsClicked(!isClicked);
        }}
      >
        <div>About the App</div>
      </div>
      {isClicked && (
        <div className="about-description-holder">{abouts[about]}</div>
      )}
    </div>
  );
}
