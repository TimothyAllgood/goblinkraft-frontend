import React from "react";
import "./Plot.css";

function Plot({ plotHook }) {
  return (
    <div className="plot">
      <div className="plot-header">
        <h1>{plotHook.name}</h1>
      </div>
      <div className="plot-content">
        <p>{plotHook.description}</p>
      </div>
    </div>
  );
}

export default Plot;
