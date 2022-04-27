import "./style_chart.css";
import React, { Component } from 'react';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Progress() {
  const percentage = 64;
  const color = "#4c9e09";
  const size = "300px";
    return (
          <div style={{ width: size, height: size, marginLeft: 200}}>
            <CircularProgressbar
              styles={buildStyles({
                pathColor: color,
                textColor: color
              })}
              maxValue={100}
              value={percentage}
              text={`${percentage}%`}
            />
          </div>
      );
}
