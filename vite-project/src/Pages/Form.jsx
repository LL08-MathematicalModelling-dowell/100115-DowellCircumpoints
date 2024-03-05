import React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Overlay from "../Components/Overlay";
import Select from "../Components/Select";
import Input from "../Components/Input";
import "./styles/styles.css"

export const FormContext = React.createContext();

export default function Form() {
  const methods = useForm();

  const [shapeType, setShapeType] = useState("");
  const [input, setInput] = useState();

  const onSubmit = methods.handleSubmit(async (data) => {
    setInput(data);
    localStorage.setItem("formData", data);
  });

  const onChange = (e) => {
    setShapeType(e.target.value);
  };
  return (
    <FormContext.Provider value={input}>
      <Overlay>
        <FormProvider {...methods}>
          <h3>Coordinate Calculator</h3>
          <form id="coordinateForm" noValidate onSubmit={onSubmit}>
            <Select
              id={"dataType"}
              label={"Type of data"}
              options={["--select--", "Cartesian Coordinate", "Geocoordinates"]}
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
                required={true}
              />
            )}

            {shapeType === "circles" && (
              <Input
                id={"circleRadius"}
                className="circleRadiusContainer"
                label={"Radius of the Circle"}
                type={"number"}
                placeholder={"Enter circle radius"}
                required={true}
              />
            )}

            <Input
              id={"length"}
              className="canvasDimensionsContainer"
              label={"Dimensions of the Canvas"}
              type={"number"}
              placeholder={"Length"}
              required={true}
            />

            <Input
              id={"width"}
              className="canvasDimensionsContainer"
              type={"number"}
              placeholder={"width"}
              required={true}
            />

            <div className="form-button-holder">
              <button className="button" type="submit">
                Calculate
              </button>
            </div>
          </form>
        </FormProvider>
      </Overlay>
    </FormContext.Provider>
  );
}