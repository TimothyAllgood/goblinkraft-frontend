import React from "react";
import "./Plot.css";

function Plot({ plotHook }) {
  return (
    <div className="single-plot-container">
      <div className="plot">
        <div className="plot-header">
          <h1>{plotHook.name}</h1>
        </div>
        <div className="plot-content card-bg">
          <p>{plotHook.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Plot;
