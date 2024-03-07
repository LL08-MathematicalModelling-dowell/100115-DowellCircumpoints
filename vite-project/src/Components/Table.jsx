import React, { useContext } from "react";
import { FormContext } from "../Pages/Form";

export default function Table({ data }) {
  const formData = useContext(FormContext);

  let squareCoordinateList = [];
  data.map((squareCoordinateNestedList) => {
    squareCoordinateNestedList.map((val) => {
      squareCoordinateList.push(val);
    });
  });

  const getValue = (index) => {
    const set = new Set();
    let header = [];

    if (formData?.shapeType === "squares") {
      squareCoordinateList.map((coordinate) => {
        set.add(coordinate[index]);
      });
    } else {
      data.map((array) => {
        set.add(array[index]);
      });
    }
    header = Array.from(set);
    return header
  };

  const row = getValue(0).sort();
  const column = getValue(1).sort((a, b)=>b-a);

  return (
    <div className="table-container">
      <table border={1} className="table">
        <thead className="thead">
          <tr className="trhead">
            <th className="th"></th>
            {row.map((x, index) => (
              <th className="th" key={index}>
                {x}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {column.map((y, yIndex) => (
            <tr key={yIndex}>
              <th className="th" style={{ color: "black" }}>
                {y}
              </th>
              {row.map((x, xIndex) => (
                <td className="td" key={xIndex}>
                  {formData?.shapeType === "squares"
                    ? squareCoordinateList.some(
                        (array) => array[0] === x && array[1] === y
                      )
                      ? `${x}, ${y}`
                      : "-"
                    : data.some(
                        (array) => array[0] === x && array[1] === y
                      )
                    ? `${x}, ${y}`
                    : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}