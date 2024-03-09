import React, { useEffect, useState } from "react";
import PlotHook from "../../../services/generator/plotHook.service";
import PlotHookData from "./PlotHookData/PlotHookData";
import "./PlotHookList.css";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function PlotHookList() {
  const [plotHooks, setPlotHooks] = useState({});
  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [selectedAdventure, setSelectedAdventure] = useState();
  useEffect(() => {
    fetchPlotHooks();
  }, []);

  const fetchPlotHooks = async () => {
    let res = await PlotHook.generatePlotHooks();
    setPlotHooks(res.plotHooks);
  };

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.4)",
          display: generating ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: generating ? 10000 : -1000,
        }}
      >
        {generating && <CircularProgress />}
      </Box>
      <div className="button-container">
        <Button variant="contained" onClick={fetchPlotHooks}>
          Roll New Plot Hooks
        </Button>
      </div>
      <section className="plot-hook-list">
        {plotHooks.length > 0 &&
          plotHooks.map((plotHook, i) => {
            return (
              <PlotHookData
                key={i}
                plotHook={plotHook}
                generating={generating}
                setGenerating={setGenerating}
                open={open}
                setOpen={setOpen}
                setSelectedAdventure={setSelectedAdventure}
              />
            );
          })}
      </section>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,1)",
          display: generating || open ? "block" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          overflow: "auto",
          zIndex: generating || open ? 10000 : -1000,
        }}
      >
        <CloseIcon
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            cursor: "pointer",
            fontSize: "2rem",
          }}
        />
        {selectedAdventure ? (
          <div
            style={{
              width: "80vw",
              minHeight: "100vh",
              height: "max-content",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              margin: " 0 auto",
              overflow: "auto",
              padding: "1rem 0",
            }}
            dangerouslySetInnerHTML={{ __html: selectedAdventure }}
          ></div>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </>
  );
}

export default PlotHookList;
