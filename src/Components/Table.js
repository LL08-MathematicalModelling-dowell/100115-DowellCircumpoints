import React from "react";

export default function Table({ data }) {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th></th>
          {data[0].map((column, columnIndex) => (
            <th key={columnIndex}>{column[1].toFixed(1)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <th>{row[0][0].toFixed(1)}</th>
            {row.map((coordinates, columnIndex) => (
              <td key={`${rowIndex}_${columnIndex}`}>
                {`[${coordinates[0].toFixed(1)}, ${coordinates[1].toFixed(1)}]`}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
