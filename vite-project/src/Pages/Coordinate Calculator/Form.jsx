import React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Overlay from "../../Components/overlay/Overlay";
import Select from "../../Components/Select";
import Input from "../../Components/Input";
import About from "../../Components/About";
import "./util/styles.css";

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
    <div className="card-container">
      <FormContext.Provider value={input}>
        <About about={"CoordinateCalculator"} />
        <Overlay>
          <FormProvider {...methods}>
            <h3>Coordinate Calculator</h3>

            <form id="coordinateForm" noValidate onSubmit={onSubmit}>
              <div className="form-input-holder">
                <div>
                  <Input
                    id={"length"}
                    className={"input-container"}
                    label={"Dimensions of the Canvas"}
                    helpType={"canvasDimension"}
                    type={"number"}
                    placeholder={"Length: e.g. 50"}
                    required={true}
                  />
                </div>
                <div>
                  <Input
                    id={"width"}
                    className="input-container"
                    type={"number"}
                    placeholder={"width: e.g. 40"}
                    required={true}
                  />
                </div>
              </div>

              <div className="form-input-holder">
                <Select
                  id={"shapeType"}
                  className={"input-container"}
                  label={"Type of Shape"}
                  helpType={"shapeType"}
                  options={["--select--", "squares", "circles"]}
                  changeHandler={onChange}
                />
              </div>

              {shapeType === "squares" && (
                <div className="form-input-holder">
                  <Input
                    id={"squareSideLength"}
                    className="input-container"
                    label={"Side Length of the Square"}
                    helpType={"square"}
                    type={"number"}
                    placeholder={"Enter side length: e.g. 2"}
                    required={true}
                  />
                </div>
              )}

              {shapeType === "circles" && (
                <div className="form-input-holder">
                  <Input
                    id={"circleRadius"}
                    className="input-container"
                    label={"Radius of the Circle"}
                    helpType={"radius"}
                    type={"number"}
                    placeholder={"Enter circle radius"}
                    required={true}
                  />
                </div>
              )}

              <div className="form-input-holder">
                <Select
                  id={"dataType"}
                  className={"input-container"}
                  label={"Type of data"}
                  helpType={"dataType"}
                  options={[
                    "--select--",
                    "Cartesian Coordinate",
                    "Geocoordinates",
                  ]}
                />
              </div>

              <div className="form-button-holder">
                <button className="button" type="submit">
                  Calculate
                </button>
              </div>
            </form>
          </FormProvider>
        </Overlay>
      </FormContext.Provider>
    </div>
  );
}
