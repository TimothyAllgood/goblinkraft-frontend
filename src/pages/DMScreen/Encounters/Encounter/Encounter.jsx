import { Autocomplete, Button, Input, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import MonsterData from "../../../../services/admin/generatorData/monster/monsterData.service";
import "./Encounter.css";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Encounter({ players, updatePlayers }) {
  const [autocomplete, setAutocomplete] = useState([]);
  const [combatants, setCombatants] = useState([]);

  useEffect(() => {
    getAutocomplete("goblin");
  }, []);

  useEffect(() => {
    setCombatants((prevCombatants) => {
      let newPlayers = players.filter(
        (player) => !prevCombatants.includes(player)
      );

      const previousCombatantIds = prevCombatants
        .filter((c) => c.type === "player")
        .map((c) => c.id);

      const playerIds = newPlayers.map((p) => p.id);

      const sharedIds = [];
      for (const id of previousCombatantIds) {
        if (playerIds.includes(id)) {
          sharedIds.push(id);
        }
      }
      prevCombatants.forEach((combatant) => {
        if (sharedIds.includes(combatant.id)) {
          const newPlayer = newPlayers.find((p) => p.id === combatant.id);
          newPlayers = newPlayers.filter((p) => p.id !== combatant.id);
          if (newPlayer) {
            combatant.name = newPlayer.name; // Update other properties as needed
          }
        }
      });

      return [...prevCombatants, ...newPlayers];
    });
  }, [players]);

  const getAutocomplete = async (val) => {
    try {
      let res = await MonsterData.getAutocompleteMonsters(val ? val : "goblin");
      setAutocomplete(Array.isArray(res) ? res : []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, value) => {
    const newCombatant = {
      ...value,
      initiative: 0,
      type: "monster",
      id: combatants.some((c) => c.id === value.id)
        ? value.id * 2
        : value.id * 2 * Math.random(),
    };

    setCombatants((prevCombatants) => [...prevCombatants, newCombatant]);
  };

  const handleCombatantChange = (e, combatant) => {
    const value = e.target.value;
    const combatantIndex = combatants.findIndex((c) => {
      return c.id === combatant.id;
    });
    const updatedCombatants = [...combatants];
    updatedCombatants[combatantIndex] = {
      ...updatedCombatants[combatantIndex],
      name: value,
    };
    updatePlayers(updatedCombatants.filter((c) => c.type === "player"));

    setCombatants(updatedCombatants);
  };

  const rollInitiative = (e, combatant, roll) => {
    let result;
    if (roll) {
      result = Math.floor(Math.random() * 20) + 1;
    } else {
      result = e.target.value;
    }
    const combatantIndex = combatants.findIndex((c) => {
      return c.id === combatant.id;
    });
    if (result > 20) {
      result = 20;
    }
    const updatedCombatants = [...combatants];
    updatedCombatants[combatantIndex] = {
      ...updatedCombatants[combatantIndex],
      initiative: result,
    };

    setCombatants(updatedCombatants);
  };

  const sortCombatants = () => {
    if (combatants.length > 1) {
      const sortedCombatants = [...combatants].sort(
        (a, b) => b.initiative - a.initiative
      );
      setCombatants(sortedCombatants);
    }
  };

  return (
    <div className="encounter">
      <Autocomplete
        disablePortal
        id="encounter-autocomplete"
        options={autocomplete}
        sx={{ width: 1 }}
        getOptionLabel={(option) => option.name}
        getOptionKey={(option) => option.id}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Monsters"
            onChange={(e) => {
              getAutocomplete(e.target.value);
            }}
          />
        )}
      />
      <Button
        sx={{ margin: "1rem 0" }}
        onClick={sortCombatants}
        variant="contained"
        disabled={combatants.length < 2}
      >
        Sort Combatants
      </Button>

      <div className="combatants">
        {combatants?.length > 0 &&
          combatants.map((combatant) => {
            return (
              <div className="combatant" key={combatant.id}>
                <Input
                  value={combatant.name}
                  onChange={(e) => handleCombatantChange(e, combatant)}
                  className="combatant-input"
                  key={combatant.id}
                >
                  {combatant?.name}
                </Input>
                <FontAwesomeIcon
                  icon={faDiceD20}
                  onClick={(e) => rollInitiative(e, combatant, true)}
                />
                <Input
                  id="initiative"
                  value={combatant.initiative}
                  onChange={(e) => rollInitiative(e, combatant, false)}
                  className="combatant-input"
                  key={combatant.id}
                  type="number"
                >
                  {combatant?.initiative}
                </Input>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Encounter;
