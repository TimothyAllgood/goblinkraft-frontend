import { Divider, Typography } from "@mui/material";
import React from "react";
import "./PlotHookData.css";

function PlotHookData({ plotHook }) {
  console.log(plotHook);
  return (
    <div className="plot-hook-card">
      <div className="plot-hook-header">
        <div className="name">
          <h3>{plotHook?.name}</h3>
        </div>
        <div className="details"></div>
      </div>
      <Divider />
      <div className="description">
        <p>{plotHook.description}</p>
      </div>
    </div>
  );
}

export default PlotHookData;
