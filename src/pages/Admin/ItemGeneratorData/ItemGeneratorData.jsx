import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

import "./ItemGeneratorData.css";
import ItemEffects from "./ItemEffects/ItemEffects";
import ItemCurses from "./ItemCurses/ItemCurses";

function ItemGeneratorData() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ margin: "2rem" }}>
      <Typography variant="h4" sx={{ margin: "1rem" }}>
        Item Generator Data
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="admin panel">
          <Tab label="Item Effects" />
          <Tab label="Item Curses" />
        </Tabs>
      </Box>
      {value === 0 ? <ItemEffects value={value} index={0}></ItemEffects> : null}
      {value === 1 ? <ItemCurses value={value} index={1}></ItemCurses> : null}
    </Box>
  );
}

export default ItemGeneratorData;
