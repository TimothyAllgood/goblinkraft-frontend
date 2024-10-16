import React from "react";
import Fraction from "@mathematics/fraction";
import "./MonsterBlock.css";
import { useState, useEffect } from "react";
import Source from "../../../../util/source.util";
import { Link } from "react-router-dom";

function MonsterBlock({ monster, abilities, filters, setFilters }) {
  const [source, setSource] = useState(
    Source.getSource(monster.source) || null
  );
  const [monsterName, setMonsterName] = useState("");


  useEffect(() => {
    setSource(Source.getSource(monster.source));
    setMonsterName(`${abilities[0].affix} ${monster.name}`);
  }, [monster]);

  const parseAbilityName = (ability) => {
    let splitAbilityName = ability.description.split(".");
    if (splitAbilityName.length > 0) {
      const abilityName = splitAbilityName[0];
      let abilityDescription = "";
      if (splitAbilityName.length > 3) {
        splitAbilityName = splitAbilityName.filter((n) => n !== "");
        for (let i = 1; i < splitAbilityName.length; i++) {
          let str = splitAbilityName[i].replace(/\[.*?\]/g, `${monsterName}`);
          if (i === 1) {
            abilityDescription += str + ".";
          } else {
            abilityDescription += str;
          }
        }
      } else {
        abilityDescription = splitAbilityName[1].replace(
          /\[.*?\]/g,
          `${monsterName}`
        );
      }

      return { abilityName, abilityDescription };
    }
    return splitAbilityName;
  };

  const adjustCR = () => {
    let totalCRAdjustment = 0;
    abilities.forEach((ability) => {
      totalCRAdjustment = totalCRAdjustment + parseFloat(ability.cr, 10);
    });
    const adjustedCR =
      parseFloat(monster.cr, 10) + parseFloat(totalCRAdjustment, 10);

    if (adjustedCR < 1 && adjustedCR > 0) {
      let fraction = new Fraction(adjustedCR).toString();
      return fraction;
    }
    return Math.round(adjustedCR);
  };

  const updateFilters = (e) => {
    const val = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // add to filters
      setFilters((prevFilters) => ({
        ...prevFilters,
        source: [...prevFilters.source, val],
      }));
    }
    if (!checked) {
      // remove from filters
      let newFilters = filters.source.filter((filter) => {
        return filter !== val;
      });
      setFilters((prevFilters) => ({
        ...prevFilters,
        source: newFilters,
      }));
    }
  };

  return (
    <div className="monster-block">
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: "10000" }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80vw",
            height: 0.8,
            bgcolor: "background.paper",
            // border: "2px solid var(--border)",
            borderRadius: "5px",
            boxShadow: 24,
            p: 4,
            overflowY: "scroll",
          }}
        >
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="official-sources"
              id="official-sources"
            >
              <Typography>Official Sources</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
            >
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Monster Manual";
                    })}
                    value="Monster Manual"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Monster Manual"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Mordenkainen's Tome of Foes";
                    })}
                    value="Mordenkainen's Tome of Foes"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Mordenkainen's Tome of Foes"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Player's Handbook";
                    })}
                    value="Player's Handbook"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Player's Handbook"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Volo's Guide to Monsters";
                    })}
                    value="Volo's Guide to Monsters"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Volo's Guide to Monsters"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Van Richten's Guide to Ravenloft";
                    })}
                    value="Van Richten's Guide to Ravenloft"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Van Richten's Guide to Ravenloft"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return (
                        filter ===
                        "Mordekainen Presents: Monsters of the Multiverse"
                      );
                    })}
                    value="Mordekainen Presents: Monsters of the Multiverse"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Mordekainen Presents: Monsters of the Multiverse"
              />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="official-adventures"
              id="official-adventures"
            >
              <Typography>Official Adventures</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
            >
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Curse of Strahd";
                    })}
                    value="Curse of Strahd"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Curse of Strahd"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Hoard of the Dragon Queen";
                    })}
                    value="Hoard of the Dragon Queen"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Hoard of the Dragon Queen"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Out of the Abyss";
                    })}
                    value="Out of the Abyss"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Out of the Abyss"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Princes of the Apocalypse";
                    })}
                    value="Princes of the Apocalypse"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Princes of the Apocalypse"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Rise of Tiamat";
                    })}
                    value="Rise of Tiamat"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Rise of Tiamat"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Storm King's Thunder";
                    })}
                    value="Storm King's Thunder"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Storm King's Thunder"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Tales from the Yawning Portal";
                    })}
                    value="Tales from the Yawning Portal"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Tales from the Yawning Portal"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Tomb of Annihilation";
                    })}
                    value="Tomb of Annihilation"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Tomb of Annihilation"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Eberron Rising From the Last War";
                    })}
                    value="Eberron Rising From the Last War"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Eberron Rising From the Last War"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Mythic Odysseys of Theros";
                    })}
                    value="Mythic Odysseys of Theros"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Mythic Odysseys of Theros"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Rime of the Frostmaiden";
                    })}
                    value="Rime of the Frostmaiden"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Rime of the Frostmaiden"
              />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="official-supplements"
              id="official-supplements"
            >
              <Typography>Official Supplements</Typography>
            </AccordionSummary>{" "}
            <AccordionDetails
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
            >
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "HotDQ supplement";
                    })}
                    value="HotDQ supplement"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="HotDQ supplement"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return (
                        filter ===
                        "Princes of the Apocalypse Online Supplement v1.0"
                      );
                    })}
                    value="Princes of the Apocalypse Online Supplement v1.0"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Princes of the Apocalypse Online Supplement v1.0"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "The Tortle Package";
                    })}
                    value="The Tortle Package"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="The Tortle Package"
              />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="third-party-sources"
              id="third-party-sources"
            >
              <Typography>Third Party Sourcs</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
            >
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Flee Mortals";
                    })}
                    value="Flee Mortals"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Flee Mortals"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Tome of Beasts (2023)";
                    })}
                    value="Tome of Beasts (2023)"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Tome of Beasts (2023)"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Tome of Beasts";
                    })}
                    value="Tome of Beasts"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Tome of Beasts"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Tome of Beasts 2";
                    })}
                    value="Tome of Beasts 2"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Tome of Beasts 2"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Tome of Beasts 3";
                    })}
                    value="Tome of Beasts 3"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Tome of Beasts 3"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Demon Cults & Secret Societies";
                    })}
                    value="Demon Cults & Secret Societies"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Demon Cults & Secret Societies"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Fifth Edition Foes";
                    })}
                    value="Fifth Edition Foes"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Fifth Edition Foes"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Primeval Thule Campaign Setting";
                    })}
                    value="Primeval Thule Campaign Setting"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Primeval Thule Campaign Setting"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Primeval Thule Gamemaster's Companion";
                    })}
                    value="Primeval Thule Gamemaster's Companion"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Primeval Thule Gamemaster's Companion"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Quests of Doom Volume 1";
                    })}
                    value="Quests of Doom Volume 1"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Quests of Doom Volume 1"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Quests of Doom Volume 2";
                    })}
                    value="Quests of Doom Volume 2"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Quests of Doom Volume 2"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return (
                        filter === "Ultimate Bestiary Revenge of the Horde"
                      );
                    })}
                    value="Ultimate Bestiary Revenge of the Horde"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Ultimate Bestiary Revenge of the Horde"
              />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="community-sources"
              id="community-sources"
            >
              <Typography>Community Sources</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
            >
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Critter Compendium";
                    })}
                    value="Critter Compendium"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Critter Compendium"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Monster Module";
                    })}
                    value="Monster Module"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Monster Module"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Monster-A-Day";
                    })}
                    value="Monster-A-Day"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Monster-A-Day"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Monsters of the Guild";
                    })}
                    value="Monsters of the Guild"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Monsters of the Guild"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Nerzugal's Dungeon Master Toolkit 2";
                    })}
                    value="Nerzugal's Dungeon Master Toolkit 2"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Nerzugal's Dungeon Master Toolkit 2"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={filters.source.some((filter) => {
                      return filter === "Nerzugal's Extended Bestiary";
                    })}
                    value="Nerzugal's Extended Bestiary"
                    onChange={(e) => updateFilters(e)}
                  />
                }
                label="Nerzugal's Extended Bestiary"
              />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Modal> */}
      <div className="monster-heading">
        <div className="monster-name">
          <h3>{monsterName}</h3>
          {/* <Button variant="contained" onClick={handleOpen}>
            Set Filters
          </Button> */}
        </div>
        <div className="monster-details">
          <p>
            <span className="capitalize">{monster.alignment}</span>{" "}
            {monster.type}, found in {monster.environment} environments
          </p>
        </div>
      </div>
      {/* <Divider /> */}
      <div className="cr card-bg">
        <p>
          <span className="bold">Challenge Rating:</span> {adjustCR()}
        </p>

        {/* <Tooltip
          className="info-tooltip"
          title={
            <>
              <Typography>{source.name}</Typography>
            </>
          }
          arrow
          enterTouchDelay={100}
        >
          
        </Tooltip> */}
        <div className="source-link-container">
          <p>
            <span className="bold">Source:</span>
          </p>
          <Link
            to={monster.link ? monster.link : source.link}
            target="_blank"
            className="source-link"
          >
            <p>{source.shortname}</p>
            <p>{monster.sourcePage ? `pg. ${monster.sourcePage}` : ""}</p>
          </Link>
        </div>
      </div>

      {/* <Divider /> */}
      <div className="ability card-bg">
        {abilities.map((ability, i) => {
          return (
            <p key={i}>
              <span className="bold">
                {parseAbilityName(ability).abilityName + "."}
              </span>
              {parseAbilityName(ability).abilityDescription + "."}{" "}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default MonsterBlock;
