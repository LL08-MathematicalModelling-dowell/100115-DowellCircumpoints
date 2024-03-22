import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();
  return (
    <div className="nav-bar">
      <Link to={"/"} className="link">
        <div
          className={`menu-wrapper ${location.pathname === "/" && "active"}`}
        >
          Home
        </div>
      </Link>
      <Link to={"/gps-device-locator"} className="link">
        <div
          className={`menu-wrapper ${
            (location.pathname === "/gps-device-locator" ||
              location.pathname === "/visualization") &&
            "active"
          }`}
        >
          GPS Device Locator
        </div>
      </Link>
    </div>
  );
}
