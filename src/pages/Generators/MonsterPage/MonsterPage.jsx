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

  // useEffect(() => {
  //   setGeneratingArt(false);
  //   setMonsterArtModalOpen(false);
  //   setMonsterArt(null);
  //   setBoxedText(null);
  //   setGeneratingBoxedText(false);
  // }, [monster]);

  const fetchMonster = async () => {
    setGenerating(true);
    let res = await Monster.generateMonster(filters);
    setMonster(res);
    setGenerating(false);
  };

  // const fetchMonsterArt = async () => {
  //   setGeneratingArt(true);
  //   let res = await Monster.generateMonsterArt(monster);
  //   setMonsterArt(res);
  //   setGeneratingArt(false);
  //   setMonsterArtModalOpen(true);
  // };

  // const fetchBoxedText = async () => {
  //   setGeneratingBoxedText(true);
  //   let res = await Monster.generateBoxedText(monster);
  //   setBoxedText(res.text);
  //   setGeneratingBoxedText(false);
  // };

  return (
    <div className="monster-page container">
      <div className="monster-page-header">
        <div className="monster-buttons">
          <Button onClick={fetchMonster} variant="dark" disabled={generating}>
            {generating ? "Generating..." : "Generate Another Monster"}
          </Button>
          {/* <Button
            onClick={fetchMonsterArt}
            variant="dark"
            disabled={generatingArt}
          >
            {generatingArt ? "Generating..." : "Generate Art"}
          </Button>
          {monsterArt && (
            <Button onClick={() => setMonsterArtModalOpen(true)} variant="dark">
              View Art
            </Button>
          )}
          <Button
            onClick={fetchBoxedText}
            variant="dark"
            disabled={generatingBoxedText}
          >
            {generatingBoxedText ? "Generating..." : "Generate Boxed Text"}
          </Button> */}
        </div>
      </div>
      <section className="monster-page">
        {monster.monster && (
          <>
            <MonsterBlock
              monster={monster.monster}
              abilities={monster.abilities}
              filters={filters}
              setFilters={setFilters}
            />
          </>
        )}
        {/* {boxedText && (
          <div className="boxed-text">
            <p>{boxedText}</p>
          </div>
        )} */}
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
      {/* <Modal
        isOpen={monsterArtModalOpen}
        onClose={() => {
          setMonsterArtModalOpen(false);
        }}
      >
        <img src={monsterArt} alt="Monster Art" />
      </Modal> */}
    </div>
  );
}

export default MonsterPage;
