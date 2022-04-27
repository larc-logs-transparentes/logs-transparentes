import React from "react";
import { Doughnut } from "react-chartjs-2";

const data = {
  labels: ["CANDIDATO X", "CANDIDATO Y"],
  datasets: [
    {
      data: [250000, 185000],
      backgroundColor: ["red", "#36A2EB"],
      hoverBackgroundColor: ["#4c9e09", "#4c9e09"],
      borderWidth: 2
    }
  ]
};
export default function Chart() {
  return <Doughnut data={data} />;
}
