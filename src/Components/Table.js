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
    return formData.shapeType === "squares"
      ? header
      : header.sort((a, b) => a - b);
  };

  const row = getValue(0);
  const column = getValue(1);

  return (
    <div className="table-container">
      <table border={1} className="table">
        <thead className="thead">
          <tr className="trhead">
            <th className="th"></th>
            {column.map((elem, index) => (
              <th className="th" key={index}>
                {elem}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {row.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th className="th">{row}</th>
              {column.map((column, columnIndex) => (
                <td className="td" key={columnIndex}>
                  {formData?.shapeType === "squares"
                    ? squareCoordinateList.some(
                        (array) => array[0] === row && array[1] === column
                      )
                      ? `${row}, ${column}`
                      : "-"
                    : data.some(
                        (array) => array[0] === row && array[1] === column
                      )
                    ? `${row}, ${column}`
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
