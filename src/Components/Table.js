import React from "react";

export default function Table({ data }) {
  return (
    <div className="table-container">
      <table border={1} className="table">
        <thead className="thead">
          <tr className="trhead">
            <th></th>
            {data[0].map((column, columnIndex) => (
              <th className="th" key={columnIndex}>
                {column[1]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="trbody">
              <th>{row[0][0]}</th>
              {row.map((coordinates, columnIndex) => (
                <td key={`${rowIndex}_${columnIndex}`} className="td">
                  {`[${coordinates[0]}, ${coordinates[1]}]`}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
