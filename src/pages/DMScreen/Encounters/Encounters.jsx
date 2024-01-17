import React, { useState } from "react";
import Encounter from "./Encounter/Encounter";
import "./Encounters.css";
import { Box, Button, Tab, Tabs } from "@mui/material";

function Encounters() {
  const [selectedValue, setSelectedValue] = useState(0);
  const [value, setValue] = useState(0);
  const [players, setPlayers] = useState([]);

  const handleChange = (event, newValue) => {
    setSelectedValue(newValue);
  };

  const getTabs = () => {
    let tabs = [];
    for (let i = 0; i <= value; i++) {
      tabs.push(<Tab key={i} label={`Encounter ${i + 1}`} />);
    }
    return tabs;
  };

  const getEncounters = () => {
    let encounters = [];
    for (let i = 0; i <= value; i++) {
      encounters.push(
        <div
          style={{
            display: selectedValue === i ? "flex" : "none",
            width: "100%",
          }}
        >
          <Encounter
            key={i}
            value={value}
            index={i}
            players={players}
            updatePlayers={updatePlayers}
          ></Encounter>
        </div>
      );
    }
    return encounters;
  };

  const addEncounter = () => {
    setValue(value + 1);
  };

  const addPlayer = () => {
    setPlayers((prevPlayers) => [
      ...prevPlayers,
      {
        name: `Player ${prevPlayers.length + 1}`,
        id: prevPlayers.length + 1,
        initiative: 0,
        type: "player",
      },
    ]);
  };

  const updatePlayers = (updatedPlayers) => {
    setPlayers(updatedPlayers);
  };

  return (
    <section className="encounters">
      <div className="encounter-buttons">
        <Button variant="contained" onClick={addEncounter}>
          Add Encounter
        </Button>
        <Button variant="contained" onClick={addPlayer}>
          Add Player
        </Button>
      </div>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: 1,
        }}
      >
        <Tabs
          value={selectedValue}
          onChange={handleChange}
          aria-label="encounter-panel"
          variant="scrollable"
          scrollButtons="auto"
        >
          {getTabs()}
        </Tabs>
      </Box>
      {getEncounters()}
    </section>
  );
}

export default Encounters;
