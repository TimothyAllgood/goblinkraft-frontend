import { Box, Button } from "@mui/material";
import React, { useState } from "react";

function Table({ value }) {
  const [item, setItem] = useState([]);

  const generateItem = async () => {
    const res = await value.generator();
    const keys = Object.keys(res);
    if (keys.length > 1) {
      setItem((prevItem) => [...prevItem, res]);
    }
    if (res[keys[0]].length > 0 && keys.length === 1) {
      setItem((prevItem) => [...prevItem, ...res[keys[0]]]);
    }
    if (res[keys[0]].length === 1 && keys.length === 1) {
      setItem((prevItem) => [...prevItem, res[keys[0]]]);
    }
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: "1rem", mt: "1rem" }}
    >
      <Button variant="contained" onClick={generateItem}>
        Generate {value.label}
      </Button>
    </Box>
  );
}

export default Table;
