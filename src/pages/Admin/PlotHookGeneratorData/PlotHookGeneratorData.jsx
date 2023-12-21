import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import PlotHooks from "./PlotHooks/PlotHooks";

import "./PlotHookGeneratorData.css";

function PlotHookGeneratorData() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ margin: "2rem" }}>
      <Typography variant="h4" sx={{ margin: "1rem" }}>
        Plot Hook Generator Data
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="admin panel">
          <Tab label="Plot Hooks" />
        </Tabs>
      </Box>
      {value === 0 ? <PlotHooks value={value} index={0}></PlotHooks> : null}
    </Box>
  );
}

export default PlotHookGeneratorData;
