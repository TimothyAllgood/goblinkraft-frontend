import React, { useEffect, useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import Stat from "../../util/stat.util";
import Fraction from "@mathematics/fraction";
import { useParams } from "react-router-dom";
import MonsterData from "../../services/admin/generatorData/monster/monsterData.service";
import "./MonsterEdit.css";

function MonsterEdit() {
  const { id } = useParams();
  const [monster, setMonster] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMonster();
  }, []);

  const fetchMonster = async () => {
    try {
      setLoading(true);
      let res = await MonsterData.getMonster(id);
      setMonster(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMonster((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await MonsterData.update(monster);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return "Loading";

  if (monster)
    return (
      <Box>
        <form onSubmit={handleSubmit}>
          <div className="monster-heading">
            <div className="monster-name">
              <Typography variant="h5">{monster.name}</Typography>
            </div>
            <div className="monster-details">
              <Typography>
                {monster.size} {monster.type}, {monster.alignment}
              </Typography>
            </div>
          </div>
          <Divider />
          <div className="monster-defense">
            <div className="ac">
              <Typography>
                <span className="bold">Armor Class</span> {monster.ac}
              </Typography>
            </div>
            <div className="hp">
              <Typography>
                <span className="bold">Hit Points</span> {monster.hp}
              </Typography>
            </div>
            <div className="speed">
              <Typography>
                <span className="bold">Speed</span> {monster.speed}
              </Typography>
            </div>
          </div>
          <Divider />
          <div className="monster-stats">
            {[
              { name: "Strength", val: monster.strength },
              { name: "Dexterity", val: monster.dexterity },
              { name: "Constitution", val: monster.constitution },
              { name: "Intelligence", val: monster.intelligence },
              { name: "Wisdom", val: monster.wisdom },
              { name: "Charisma", val: monster.charisma },
            ].map((stat, i) => {
              return (
                <div className="stat" key={i}>
                  <p className="stat-name">
                    {Stat.getStatAbbreviation(stat.name)}
                  </p>
                  <div className="value-modifier">
                    <p className="value">{stat.val}</p>
                    <p className="modifier">
                      {Stat.getModifier(stat.val) >= 0 && <>+</>}
                      {Stat.getModifier(stat.val)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <Divider />
          <div className="monster-info">
            {monster.skills && (
              <div className="skills">
                <Typography>
                  <span className="bold">Skills</span> {monster.skills}
                </Typography>
              </div>
            )}
            {monster.damageResistances && (
              <div className="damage-resitances">
                <Typography>
                  <span className="bold">Damage Resistances</span>{" "}
                  {monster.damageResistances}
                </Typography>
              </div>
            )}
            {monster.damageImmunities && (
              <div className="damage-immunities">
                <Typography>
                  <span className="bold">Damage Immunities</span>{" "}
                  {monster.damageImmunities}
                </Typography>
              </div>
            )}
            {monster.damageVulnerabilities && (
              <div className="damage-vulnerabilities">
                <Typography>
                  <span className="bold">Damage Vulnerabilities</span>{" "}
                  {monster.damageVulnerabilities}
                </Typography>
              </div>
            )}
            {monster.conditionImmunities && (
              <div className="condition-immunities">
                <Typography>
                  <span className="bold">Condition Immunities</span>{" "}
                  {monster.conditionImmunities}
                </Typography>
              </div>
            )}
            <div className="senses">
              <Typography>
                <span className="bold">Senses</span> {monster.senses}
              </Typography>
            </div>
            <div className="languages">
              <Typography>
                <span className="bold">Languages</span>{" "}
                <span className="capitalize-first">
                  {monster.languages ? monster.languages : "None"}
                </span>
              </Typography>
            </div>
            <div className="cr">
              <Typography>
                <span className="bold">Challenge</span>{" "}
                {monster.cr < 1
                  ? new Fraction(monster.cr).toString()
                  : monster.cr}
              </Typography>
            </div>
          </div>
          <Divider />
          {monster.traits && (
            <div className="monster-traits">
              <Typography>{monster.traits}</Typography>
            </div>
          )}
          <Divider />
          <div className="monster-attacks">
            <div className="actions">
              <Typography variant="h5">Actions</Typography>
              {monster.actions && (
                <TextField
                  id="actions"
                  name="actions"
                  defaultValue={monster.actions}
                  variant="outlined"
                  multiline
                  sx={{ width: 1 }}
                  onChange={handleChange}
                />
              )}
            </div>
            {monster.legendaryActions && (
              <div className="legendary-actions">
                <Typography variant="h5">Legendary Actions</Typography>
                <TextField
                  id="legendaryActions"
                  name="legendaryActions"
                  defaultValue={monster.legendaryActions}
                  variant="outlined"
                  multiline
                  sx={{ width: 1 }}
                  onChange={handleChange}
                />
              </div>
            )}{" "}
            {monster.mythicActions && (
              <div className="mythic-actions">
                <Typography variant="h5">Mythic Actions</Typography>
                <TextField
                  id="mythicActions"
                  name="mythicActions"
                  defaultValue={monster.mythicActions}
                  variant="outlined"
                  multiline
                  sx={{ width: 1 }}
                  onChange={handleChange}
                />
              </div>
            )}
            {monster.lairActions && (
              <div className="lair-actions">
                <Typography variant="h5">Lair Actions</Typography>
                <TextField
                  id="lairActions"
                  name="lairActions"
                  defaultValue={monster.lairActions}
                  variant="outlined"
                  multiline
                  sx={{ width: 1 }}
                  onChange={handleChange}
                />
              </div>
            )}
            {monster.bonusActions && (
              <div className="bonus-actions">
                <Typography variant="h5">Bonus Actions</Typography>
                <TextField
                  id="bonusActions"
                  name="bonusActions"
                  defaultValue={monster.bonusActions}
                  variant="outlined"
                  multiline
                  sx={{ width: 1 }}
                  onChange={handleChange}
                />
              </div>
            )}
            {monster.reactions && (
              <div className="reactions">
                <Typography variant="h5">Reactions</Typography>
                <TextField
                  id="reactions"
                  name="reactions"
                  defaultValue={monster.reactions}
                  variant="outlined"
                  multiline
                  sx={{ width: 1 }}
                  onChange={handleChange}
                />
              </div>
            )}
            {monster.regionalEffects && (
              <div className="regional">
                <Typography variant="h5">Regional Effects</Typography>
                <TextField
                  id="regionalEffects"
                  name="regionalEffects"
                  defaultValue={monster.regionalEffects}
                  variant="outlined"
                  multiline
                  sx={{ width: 1 }}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          <Button
            variant="contained"
            sx={{ width: "fit-content", alignSelf: "flex-end" }}
            type="submit"
          >
            Update {monster.name}
          </Button>
        </form>
      </Box>
    );
}

export default MonsterEdit;
