import React, { useEffect, useState } from "react";
import "./MonsterPage.css";
import Monster from "../../../services/generator/monster.service";
import MonsterBlock from "./MonsterBlock/MonsterBlock";
import Button from "../../../components/Button/Button";

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
  const [generating, setGenerating] = useState(true);

  useEffect(() => {
    fetchMonster();
  }, []);

  const fetchMonster = async () => {
    setGenerating(true);
    let res = await Monster.generateMonster(filters);
    setMonster(res);
    setGenerating(false);
  };
  return (
    <div className="monster-page container">
      <div className="monster-page-header">
        <div className="monster-buttons">
          <Button onClick={fetchMonster} variant="dark" disabled={generating}>
            {generating ? "Generating..." : "Generate Another Monster"}
          </Button>
        </div>
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
          <p>
            In order to provide concise and clear information from our generator
            while respecting the original creators of these monsters, we've
            included partial details. This helps avoid information overload and
            ensures due credit. For complete monster stats, please consult the
            original source.
          </p>
        </div>
      </section>
    </div>
  );
}

export default MonsterPage;
