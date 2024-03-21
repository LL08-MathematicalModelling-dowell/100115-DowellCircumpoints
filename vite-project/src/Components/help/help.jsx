import React, { useState } from "react";
import { helps } from "./util/constants";
import "./style.css";

/*THis is just a  demo it will changed*/

export function Yon({ title = "", description = "" }) {
  return (
    <div className="descriptions-holder">
      <div className="help-title">{title}</div>
      <div>{description}</div>
    </div>
  );
}

/***** */

/*THis will have a separate component*/
export function About() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div
      style={{ position: "absolute", top: "15%", right: "0", width: "30rem" }}
    >
      <div
        style={{
          minHeight: "5rem",
          display: "flex",
          alignItems: "center",
          backgroundColor: "gray",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
          fontFamily: "Fauna One",
          // serif,
          fontWeight: "400",
          fontSize: "1.5rem",
          fontStyle: "normal",
          color: "white",
          paddingLeft: "30px",
          borderRadius: "10px 0 0 10px",
          cursor: "pointer",
        }}
        onClick={() => {
          setIsClicked(!isClicked);
        }}
      >
        <div>About the App</div>
      </div>
      {isClicked && (
        <div
          style={{
            display: "",
            height: "auto",
            // width: "32rem",
            backgroundColor: "white",
            padding: "2rem",
            textAlign: "justify",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            The GPS Device Locator, nestled within our main application,
            empowers you with pinpoint accuracy in identifying locations and
            intersections. It operates by processing a series of (x, y)
            coordinates paired with a radius. This data drives the calculation
            of 360 points evenly distributed along the circumference of each
            circle, enabling meticulous mapping of its perimeter.
          </div>
          <div style={{ marginBottom: "1rem" }}>
            By analyzing the overlaps and intersections of multiple circles, the
            app provides users with vital information about points where circles
            intersect, facilitating complex spatial analysis and
            decision-making.
          </div>
          {/* <div>
            <ol>
              <li>
                Center of GPS Devices: The Centers of GPS Devices input consists
                of a list of (x, y) coordinate pairs that serve as the center
                points for each circle in the GPS Device Locator. These
                coordinates define the location around which the circles are
                drawn on the map.
              </li>
              <li>
                Radius: This parameter specifies the radius value to be used
                while plotting the circles around the center coordinates
                Adjusting the radius allows you to control the size and reach of
                the circles, influencing the precision and scope of the spatial
                analysis.
              </li>
            </ol>
          </div> */}
        </div>
      )}
    </div>
  );
}

/***** */

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
