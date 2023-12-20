import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import Quirks from "./Quirks/Quirks";
import Activities from "./Activities/Activities";
import "./NPCGeneratorData.css";

function NPCGeneratorData() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ margin: "2rem" }}>
      <Typography variant="h4" sx={{ margin: "1rem" }}>
        NPC Generator Data
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="admin panel">
          <Tab label="Quirks" />
          <Tab label="Activities" />
        </Tabs>
      </Box>
      {value === 0 ? <Quirks value={value} index={0}></Quirks> : null}
      {value === 1 ? <Activities value={value} index={1}></Activities> : null}
    </Box>
  );
}

export default NPCGeneratorData;
