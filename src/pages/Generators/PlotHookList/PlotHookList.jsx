import React, { useEffect, useState } from "react";
import PlotHook from "../../../services/plotHook.service";
import PlotHookData from "./PlotHookData/PlotHookData";
import "./PlotHookList.css";
import { Button } from "@mui/material";

function PlotHookList() {
  const [plotHooks, setPlotHooks] = useState({});

  useEffect(() => {
    fetchPlotHooks();
  }, []);

  const fetchPlotHooks = async () => {
    let res = await PlotHook.generatePlotHooks();
    setPlotHooks(res.plotHooks);
  };

  return (
    <>
      <div className="button-container">
        <Button variant="contained" onClick={fetchPlotHooks}>
          Roll New Plot Hooks
        </Button>
      </div>
      <section className="plot-hook-list">
        {plotHooks.length > 0 &&
          plotHooks.map((plotHook, i) => {
            return <PlotHookData key={i} plotHook={plotHook} />;
          })}
      </section>
    </>
  );
}

export default PlotHookList;
