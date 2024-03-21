import React from "react";
import { ClipLoader } from "react-spinners";
import "../../App.css";

export default function Loading(isLoading) {
  return (
    <div className="clip-loader-container">
      <ClipLoader color={"#154078"} loading={isLoading} size={150} />
      <div>Loading</div>
    </div>
  );
}