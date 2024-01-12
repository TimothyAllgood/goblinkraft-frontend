import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import MonsterData from "../../../../services/admin/generatorData/monster/monsterData.service";
import "./Encounter.css";

function Encounter({ players, updatePlayer }) {
  const [autocomplete, setAutocomplete] = useState([]);
  const [combatants, setCombatants] = useState([]);

  useEffect(() => {
    getAutocomplete("goblin");
  }, []);

  useEffect(() => {
    setCombatants((prevCombatants) => {
      const newPlayers = players.filter(
        (player) => !prevCombatants.includes(player)
      );
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
    value.initiative = 0;
    value.type = "monster";
    setCombatants((prevCombatants) => [...prevCombatants, value]);
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
        // renderOption={(props, option, state) => (
        //   <li onClick={() => console.log("clicked")} {...props}>
        //     {option.name}
        //   </li>
        // )}
      />
      {/* {players.length > 0 &&
        players.map((player) => {
          return <p key={player.id}>{player?.name}</p>;
        })} */}

      {combatants?.length > 0 &&
        combatants.map((combatant) => {
          return <p key={combatant.id}>{combatant?.name}</p>;
        })}
    </div>
  );
}

export default Encounter;
