import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import MonsterAbilities from "./MonsterAbilities/MonsterAbilities";
import MonsterList from "./MonsterList/MonsterList";

function MonsterGeneratorData() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ margin: "2rem" }}>
      <Typography variant="h4" sx={{ margin: "1rem" }}>
        Monster Generator Data
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="admin panel">
          <Tab label="Monsters" />
          <Tab label="Monster Abilities" />
        </Tabs>
      </Box>
      {value === 0 ? <MonsterList value={value} index={0}></MonsterList> : null}
      {value === 1 ? (
        <MonsterAbilities value={value} index={1}></MonsterAbilities>
      ) : null}
    </Box>
  );
}

export default MonsterGeneratorData;
