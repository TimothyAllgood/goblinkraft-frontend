import { Button, Divider, Typography } from "@mui/material";
import React from "react";
import "./PlotHookData.css";
import { useSelector } from "react-redux";
import PlotHook from "../../../../services/generator/plotHook.service";
import { useState } from "react";

function PlotHookData({
  plotHook,
  generating,
  setGenerating,
  setOpen,
  setSelectedAdventure,
}) {
  const [adventure, setAdventure] = useState();
  const subscribed = useSelector((state) => state.user.subscribed);
  const subscription = useSelector((state) => state.user.subscription);

  const generateAdventure = async () => {
    try {
      setGenerating(true);
      setOpen(false);
      setSelectedAdventure();
      let res = await PlotHook.generateAdventure(plotHook);
      setAdventure(res.adventure);
      console.log(res);
      setSelectedAdventure(res.adventure);
      setGenerating(false);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

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
      <Button
        sx={{ ml: "1rem", mb: "1rem" }}
        variant="contained"
        disabled={!subscribed || subscription !== "premium" || generating}
        onClick={generateAdventure}
      >
        Generate Adventure
      </Button>

      {adventure && (
        <Button
          variant="contained"
          sx={{ ml: "1rem", mb: "1rem" }}
          onClick={() => {
            setOpen(false);
            setOpen(true);
            setSelectedAdventure(adventure);
          }}
        >
          View Adventure
        </Button>
      )}
    </div>
  );
}

export default PlotHookData;
