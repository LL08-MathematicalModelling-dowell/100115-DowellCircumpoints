import React from "react";

import { Scatter } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-plugin-zoom"

Chart.register(...registerables)

export default function ScatterChart({ center, data }) {
  
  const flatData = data.flat()
  const maxX = Math.max(...flatData.map(point => point.x))
  const maxY = Math.max(...flatData.map(point => point.y))

  const maxPoint = Math.max(maxX, maxY)

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const dataSets = []

    for(let i = 0; i < center.length; i++){
      dataSets.push({
        label: center[i],
        data: data[i],
        backgroundColor: getRandomColor(),
      })
    }

  const options = {
    title: {display: true, text: "My Chart"},
    
    scales: {

      x: {
        ticks:{
          color:"black",
        },
        min: -maxPoint-1,
        max: maxPoint+1,
        position: "center",
        beginAtZero: true,
        

      },
      y: {
        ticks:{
          color:"black",
        },
        min: -maxPoint-1,
        max: maxPoint+1,
        position: "center",
        beginAtZero: true,
      },    
    },
    devicePixelRatio:2,
    maintainAspectRatio: false
  };

  const scatterDataSet = {
    datasets: dataSets
  };

  return (
    <div style={{width:"60%"}}>
      <Scatter data={scatterDataSet} options={options} width={800} height={500} />
    </div>
  );
}
