import React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Overlay from "./Components/Overlay";
import Select from "./Components/Select";
import Input from "./Components/Input";
import "./App.css";

export default function App() {
  const methods = useForm();

  const [shapeType, setShapeType] = useState("");
  const [input, setInput] = useState();

  const onSubmit = methods.handleSubmit(async (data) => {
    setInput(data);
  });

  const onChange = (e) => {
    setShapeType(e.target.value);
  };

  return (
    <div className="App">
      <Overlay formData={input}>
        <h2>Coordinate Calculator</h2>
        <FormProvider {...methods}>
          <form id="coordinateForm" noValidate onSubmit={onSubmit}>
            <Select
              id={"dataType"}
              label={"Type of data"}
              options={["--select", "Cartesian Coordinate", "Geocoordinates"]}
            />

            <Select
              id={"shapeType"}
              label={"Type of Shape"}
              options={["--select--", "squares", "circles"]}
              changeHandler={onChange}
            />

            {shapeType === "squares" && (
              <Input
                id={"squareSideLength"}
                className="squareSideLengthContainer"
                label={"Side Length of the Square"}
                type={"number"}
                placeholder={"Enter side length"}
              />
            )}

            {shapeType === "circles" && (
              <Input
                id={"circleRadius"}
                className="circleRadiusContainer"
                label={"Radius of the Circle"}
                type={"number"}
                placeholder={"Enter circle radius"}
              />
            )}

            <Input
              id={"length"}
              className="canvasDimensionsContainer"
              label={"Dimensions of the Canvas"}
              type={"number"}
              placeholder={"Length"}
            />

            <Input
              id={"width"}
              className="canvasDimensionsContainer"
              type={"number"}
              placeholder={"width"}
            />

            <Input
              id={"gpsDeviceCenters"}
              className="gpsDeviceCentersContainer"
              label={"Centers of the GPS Devices"}
              type={"number"}
              placeholder={"e.g., [[0,0], [1,2], [3,4]]"}
            />

            <button type="submit">Calculate</button>
          </form>
        </FormProvider>
      </Overlay>
    </div>
  );
}
