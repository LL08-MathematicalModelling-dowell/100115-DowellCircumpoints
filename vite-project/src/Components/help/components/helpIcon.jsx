import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import Help from "../help";

export default function HelpIcon({ helpType }) {
  const [position, setPosition] = useState(null);
  const [helpuType, setHelpType] = useState("");
  const [isMouseHovering, setIsMouseHovering] = useState(false);

  const handleMouseOver = (e) => {
    setPosition(e.target.getBoundingClientRect());
    setIsMouseHovering(!isMouseHovering);
    setHelpType(helpType);
  };
  const handleMouseLeave = () => {
    setIsMouseHovering(false);
  };
  return (
    <>
      <FontAwesomeIcon
        icon={faCircleQuestion}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      />

      {isMouseHovering && <Help position={position} helpType={helpuType} />}
    </>
  );
}
