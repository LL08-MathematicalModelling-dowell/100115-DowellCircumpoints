import React, { useState, useEffect } from "react";

export default function Popup({ message }) {
  const [visible, setVisible] = useState(true);
  const duration = 5;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return visible ? (
    <div className="popup-card">
      <span className="popup-message">{message}</span>
    </div>
  ) : null;
}
