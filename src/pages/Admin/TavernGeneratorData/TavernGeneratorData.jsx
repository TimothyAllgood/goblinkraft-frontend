import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import MenuItems from "./MenuItems/MenuItems";
import TavernAtmospheres from "./TavernAtmospheres/TavernAtmospheres";
import "./TavernGeneratorData.css";
import TavernEvents from "./TavernEvents/TavernEvents";
import TavernFeatures from "./TavernFeatures/TavernFeatures";
import TavernRumors from "./TavernRumors/TavernRumors";

function TavernGeneratorData() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ margin: "2rem" }}>
      <Typography variant="h4" sx={{ margin: "1rem" }}>
        Tavern Generator Data
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="admin panel">
          <Tab label="Menu Items" />
          <Tab label="Tavern Atmospheres" />
          <Tab label="Tavern Events" />
          <Tab label="Tavern Features" />
          <Tab label="Tavern Rumors" />
        </Tabs>
      </Box>
      {value === 0 ? <MenuItems value={value} index={0}></MenuItems> : null}
      {value === 1 ? (
        <TavernAtmospheres value={value} index={1}></TavernAtmospheres>
      ) : null}
      {value === 2 ? (
        <TavernEvents value={value} index={2}></TavernEvents>
      ) : null}
      {value === 3 ? (
        <TavernFeatures value={value} index={3}></TavernFeatures>
      ) : null}
      {value === 4 ? (
        <TavernRumors value={value} index={4}></TavernRumors>
      ) : null}
    </Box>
  );
}

export default TavernGeneratorData;
