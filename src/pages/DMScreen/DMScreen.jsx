import React from "react";
import "./DMScreen.css";
import { Box, Divider, Typography } from "@mui/material";
import SessionNotes from "./SessionNotes/SessionNotes";
import Encounters from "./Encounters/Encounters";

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
          border: "1px solid var(--dm-border)",
        }}
        className="dm-box"
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          Session Notes
        </Typography>
        <Divider variant="middle" />
        <SessionNotes />
      </Box>
      <Box
        gridArea="1 / 5 / 3 / 9"
        sx={{
          border: "1px solid var(--dm-border)",
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
          border: "1px solid var(--dm-border)",
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
          border: "1px solid var(--dm-border)",
        }}
        className="dm-box"
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          Encounters
        </Typography>
        <Divider variant="middle" />
        <Encounters />
      </Box>
    </Box>
  );
}

export default DMScreen;
