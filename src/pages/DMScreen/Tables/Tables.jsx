import { Autocomplete, Box, Tab, Tabs, TextField } from "@mui/material";
import React, { useState } from "react";
import Npc from "../../../services/generator/npc.service";
import Item from "../../../services/generator/item.service";
import PlotHook from "../../../services/generator/plotHook.service";
import Tavern from "../../../services/generator/tavern.service";
import Monster from "../../../services/generator/monster.service";

import Table from "./Table";
import "./Tables.css";

function Tables() {
  const [selectedValue, setSelectedValue] = useState(0);
  const [values, setValues] = useState([]);
  const autocomplete = [
    {
      label: "NPC",
      generator: Npc.generateNpcs,
      key: 1,
    },
    {
      label: "Item",
      generator: Item.generateItems,
      key: 2,
    },
    {
      label: "Plot Hook",
      generator: PlotHook.generatePlotHook,
      key: 3,
    },
    {
      label: "Tavern",
      generator: Tavern.generateTavern,
      key: 3,
    },
    {
      label: "Monster",
      generator: Monster.generateMonster,
      key: 3,
    },
  ];

  const handleAutocompleteChange = (e, option) => {
    setValues((prevValues) => {
      if (
        !prevValues.some(
          (value) =>
            value.key === option.key &&
            value.label === option.label &&
            value.generator === option.generator
        )
      ) {
        return [
          ...prevValues,
          {
            key: option.key,
            label: option.label,
            generator: option.generator,
          },
        ];
      } else {
        return prevValues;
      }
    });
  };

  const handleChange = (event, newValue) => {
    setSelectedValue(newValue);
  };

  const getTabs = () => {
    let tabs = [];
    if (values?.length > 0) {
      for (let i = 0; i <= values.length; i++) {
        if (values[i]?.label) {
          tabs.push(<Tab key={values[i].key} label={`${values[i].label}`} />);
        }
      }
      return tabs;
    }
  };

  const getTables = () => {
    let tables = [];
    if (values?.length > 0) {
      for (let i = 0; i <= values.length; i++) {
        if (values[i]?.label) {
          tables.push(
            <div
              style={{
                display: selectedValue === i ? "flex" : "none",
                width: "100%",
              }}
            >
              <Table key={values[i].key} value={values[i]} index={i}></Table>
            </div>
          );
        }
      }
      return tables;
    }
  };

  return (
    <section className="tables">
      <Autocomplete
        disablePortal
        id="encounter-autocomplete"
        options={autocomplete}
        sx={{ width: 1 }}
        getOptionLabel={(option) => option.label}
        getOptionKey={(option) => option.id}
        isOptionEqualToValue={(option, value) => option === value}
        onChange={handleAutocompleteChange}
        renderInput={(params) => <TextField {...params} label="Tables" />}
      />
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
      {getTables()}
    </section>
  );
}

export default Tables;
