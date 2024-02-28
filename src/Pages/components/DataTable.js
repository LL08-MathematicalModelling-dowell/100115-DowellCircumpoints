import React from "react";

export default function DataTable({ header, data }) {
  return (
    <table className="table">
      <thead className="thead">
        <tr className="trhead">
          <th className="th">{header}</th>
        </tr>
      </thead>
      <div className="custom-scrollable-div">
        <tbody>
          {typeof data === "object" ? (
            data.length > 0 ? (
              data.map((elem, index) => (
                <tr key={index}>
                  <td className="td cord-table">
                    {header === "Points of Intersection"
                      ? `${elem[0]}, ${elem[1]}`
                      : `${elem.x}, ${elem.y}`}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="td  cord-table">-</td>
              </tr>
            )
          ) : (
            <tr>
              <td className="td cord-table">{data}</td>
            </tr>
          )}
        </tbody>
      </div>
    </table>
  );
}
