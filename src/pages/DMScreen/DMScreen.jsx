import React from "react";
import "./DMScreen.css";
import { Box, Divider, Typography } from "@mui/material";

function DMScreen() {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridTemplateRows="repeat(4, 1fr)"
      gap={2}
      height="calc(100vh - (50px + 5rem))"
      // width="100%"
      sx={{ m: "1rem 2rem 2rem 1rem" }}
    >
      <Box
        gridArea="  1 / 1 / 5 / 5"
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.12)",
        }}
        className="dm-box"
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          Session Notes
        </Typography>
        <Divider variant="middle" />
      </Box>
      <Box
        gridArea="1 / 5 / 3 / 9"
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.12)",
        }}
        className="dm-box"
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          Rules
        </Typography>
        <Divider variant="middle" />
      </Box>
      <Box
        gridArea="3 / 5 / 5 / 9"
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.12)",
        }}
        className="dm-box"
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          Tables
        </Typography>
        <Divider variant="middle" />
      </Box>
      <Box
        gridArea="1 / 9 / 5 / 13"
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.12)",
        }}
        className="dm-box"
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          Encounters
        </Typography>
        <Divider variant="middle" />
      </Box>
    </Box>
  );
}

export default DMScreen;
