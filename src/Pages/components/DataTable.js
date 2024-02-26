import React from "react";

export default function DataTable({ header, data }) {
  return (
    <>
      <table className="table">
        <thead className="thead">
          <tr className="trhead">
            <th className=" th" style={{ color: "white" }}>
              {header}
            </th>
          </tr>
        </thead>
        <div className="scrollable-div">
          <tbody className="tbody">
            {typeof data === "object" ? (
              data.length > 0 ? (
                data.map((elem, index) => (
                  <tr key={index} className="table-row">
                    <td className="td">
                      {header === "Points of Interception"
                        ? `${elem[0]}, ${elem[1]}`
                        : `${elem.x}, ${elem.y}`}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="table-row">
                  <td className="td">-</td>
                </tr>
              )
            ) : (
              <tr className="table-row">
                <td className="td">{data}</td>
              </tr>
            )}
          </tbody>
        </div>
      </table>
    </>
  );
}
