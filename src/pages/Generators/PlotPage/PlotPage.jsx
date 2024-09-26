import React, { useEffect, useState } from "react";
import PlotHook from "../../../services/generator/plotHook.service";
import "./PlotPage.css";
import Plot from "./Plot/Plot";
import Button from "../../../components/Button/Button";

function PlotPage() {
  const [plotHooks, setPlotHooks] = useState({});
  const [generating, setGenerating] = useState(true);
  useEffect(() => {
    fetchPlotHooks();
  }, []);

  const fetchPlotHooks = async () => {
    setGenerating(true);
    let res = await PlotHook.generatePlotHooks();
    setPlotHooks(res.plotHooks);
    setGenerating(false);
  };
  return (
    <div className="plot-page container">
      <div className="plot-page-header">
        <div className="plot-buttons">
          <Button onClick={fetchPlotHooks} variant="dark" disabled={generating}>
            {generating ? "Generating..." : "Roll New Plot Hooks"}
          </Button>
        </div>
      </div>
      {plotHooks.length > 0 && (
        <div className="plot-container">
          {plotHooks.map((plotHook) => (
            <Plot key={plotHook.id} plotHook={plotHook} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PlotPage;
