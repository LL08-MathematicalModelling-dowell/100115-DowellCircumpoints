import React from "react";
import { helps } from "./util/constants";
import "./style.css";

export default function Help({ position, helpType }) {
  return (
    <div
      className="help-holder"
      style={{
        left: position?.left + 30,
        top: position?.top,
      }}
    >
      <section>
        <div>{helps[helpType]}</div>
      </section>
    </div>
  );
}
