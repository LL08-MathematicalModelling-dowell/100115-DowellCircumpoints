import React, { useRef } from "react";

import { Scatter } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(...registerables, zoomPlugin);

export default function ScatterChart({ center, data }) {
  const flatData = data.flat();
  const maxX = Math.max(...flatData.map((point) => point.x));
  const maxY = Math.max(...flatData.map((point) => point.y));

  const chartRef = useRef(null);

  const maxPoint = Math.max(maxX, maxY);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const dataSets = [];

  for (let i = 0; i < center.length; i++) {
    dataSets.push({
      label: center[i],
      data: data[i],
      backgroundColor: getRandomColor(),
    });
  }

  const handleResetZoom = () => {
    if (chartRef && chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  const options = {
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
        pan: {
          enabled: true,
          mode: "xy",
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "black",
        },
        min: -maxPoint - 1,
        max: maxPoint + 1,
        position: "center",
        beginAtZero: true,
      },
      y: {
        ticks: {
          color: "black",
        },
        min: -maxPoint - 1,
        max: maxPoint + 1,
        position: "center",
        beginAtZero: true,
      },
    },
    devicePixelRatio: 2,
    maintainAspectRatio: false,
  };

  const scatterDataSet = {
    datasets: dataSets,
  };

  return (
    <>
      <div className="scatter-chart-container" style={{ width: "100%" }}>
        <div>
          <Scatter
            ref={chartRef}
            data={scatterDataSet}
            options={options}
            width={500}
            height={500}
          />
        </div>
        <button className="button reset-button" onClick={handleZoomIn}>
          +
        </button>
        <button className="button reset-button">-</button>
        <button className="button reset-button" onClick={handleResetZoom}>
          Reset Zoom
        </button>
      </div>
    </>
  );
}
