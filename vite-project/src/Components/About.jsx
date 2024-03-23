import React, { useState } from "react";
import { abouts } from "./util/constants";
import "./util/styles.css";

export default function About({ about }) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="about-section-container">
      <button
        className="button"
        onClick={() => {
          setIsClicked(!isClicked);
        }}
      >
        About the App
      </button>

      {isClicked && (
        <div className="about-description-holder">{abouts[about]}</div>
      )}
    </div>
  );
}
