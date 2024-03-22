import React from "react";

export default function Error({ error }) {
  return (
    <div className="error-message-container">
      <h3>{error.message}</h3>
      <p>Please reload the page</p>
    </div>
  );
}
