import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import NPC from "../../Generators/NPCList/NPC/NPC";
import ItemData from "../../Generators/ItemList/Item/ItemData";
import PlotHookData from "../../Generators/PlotHookList/PlotHookData/PlotHookData";
import Monster from "../../Generators/MonsterPage/MonsterPage";
import TavernPage from "../../Generators/TavernPage/TavernPage";

function Table({ value, component }) {
  const [generatedItem, setGeneratedItem] = useState([]);

  const generateItem = async () => {
    const res = await value.generator();
    const keys = Object.keys(res);
    if (keys.length > 1) {
      setGeneratedItem((prevItem) => [...prevItem, res]);
    }
    if (res[keys[0]].length > 0 && keys.length === 1) {
      setGeneratedItem((prevItem) => [...prevItem, ...res[keys[0]]]);
    }
    if (res[keys[0]].length === 1 && keys.length === 1) {
      setGeneratedItem((prevItem) => [...prevItem, res[keys[0]]]);
    }
    renderComponent();
  };

  const renderComponent = () => {
    switch (value.label) {
      case "NPC":
        return <NPC npc={generatedItem[0]} />;
      case "Item":
        console.log(generatedItem);
        return <ItemData item={generatedItem[0]} />;
      case "Plot Hook":
        return <PlotHookData plotHook={generatedItem[0]} />;
      case "Tavern":
        return <TavernPage tavern={generatedItem[0]} />;
      case "Monster":
        return <Monster monster={generatedItem[0]} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: "1rem", mt: "1rem" }}
    >
      <Button variant="contained" onClick={generateItem}>
        Generate {value.label}
      </Button>
      {generatedItem && generatedItem.length > 0 && renderComponent()}
    </Box>
  );
}

export default Table;
