import React, { useEffect, useState } from "react";
import Monster from "../../../services/generator/monster.service";
import { Button, Typography } from "@mui/material";
import "./MonsterPage.css";
import MonsterBlock from "../../../components/MonsterBlock/MonsterBlock";

function MonsterPage() {
  const [monster, setMonster] = useState({});
  const [filters, setFilters] = useState({
    source: [
      "Mordenkainen's Tome of Foes",
      "Monster Manual",
      "Volo's Guide to Monsters",
      "Player's Handbook",
    ],
  });

  useEffect(() => {
    fetchMonster();
  }, []);

  const fetchMonster = async () => {
    let res = await Monster.generateMonster(filters);
    setMonster(res);
  };

  return (
    <>
      <div className="button-container">
        <Button variant="contained" onClick={fetchMonster}>
          Roll New Monster
        </Button>
      </div>
      <section className="monster-page">
        {monster.monster && (
          <MonsterBlock
            monster={monster.monster}
            abilities={monster.abilities}
            filters={filters}
            setFilters={setFilters}
          />
        )}
        <div className="disclaimer">
          <Typography>
            In order to provide concise and clear information from our generator
            while respecting the original creators of these monsters, we've
            included partial details. This helps avoid information overload and
            ensures due credit. For complete monster stats, please consult the
            original source.
          </Typography>
        </div>
      </section>
    </>
  );
}

export default MonsterPage;
