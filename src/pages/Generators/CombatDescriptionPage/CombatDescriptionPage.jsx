import React, { useState } from "react";
import "./CombatDescriptionPage.css";
import Autocomplete from "../../../components/Autocomplete/Autocomplete";
import MonsterData from "../../../services/admin/generatorData/monster/monsterData.service";
import SpellData from "../../../services/admin/generatorData/spell/spell.service";
import { addArticle } from "../../../util/stringTransform";
import Combat from "../../../services/generator/combat.service";
import Checkbox from "../../../components/Checkbox/Checkbox";
import Loader from "../../../components/Loader/Loader";

function CombatDescriptionPage() {
  const [classType, setClassType] = useState("");
  const [attackType, setAttackType] = useState("");
  const [weaponType, setWeaponType] = useState("");
  const [enemies, setEnemies] = useState([]);
  const [isCombatOver, setIsCombatOver] = useState(true);
  const [environmentType, setEnvironmentType] = useState("");
  const [tone, setTone] = useState("");
  const [enemiesToDelete, setEnemiesToDelete] = useState([]);
  const [graveyard, setGraveyard] = useState([]);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const environmentTypes = [
    { id: 1, name: "In a forest" },
    { id: 2, name: "In a desert" },
    { id: 3, name: "In a city" },
    { id: 4, name: "In a dungeon" },
    { id: 5, name: "In a cave" },
    { id: 6, name: "On a mountain" },
    { id: 7, name: "On a lake" },
    { id: 8, name: "On a river" },
    { id: 9, name: "In a village" },
    { id: 10, name: "In a town" },
    { id: 11, name: "In a castle" },
    { id: 12, name: "In a temple" },
    { id: 13, name: "In a cave" },
  ];

  const tones = [
    { id: 1, name: "Heroic" },
    { id: 2, name: "Gritty" },
    { id: 3, name: "Tragic" },
    { id: 4, name: "Dark" },
    { id: 5, name: "Epic" },
    { id: 6, name: "Comedic" },
    { id: 7, name: "Chaotic" },
    { id: 8, name: "Somber" },
    { id: 9, name: "Vengeful" },
    { id: 10, name: "Merciful" },
    { id: 11, name: "Cinematic" },
    { id: 12, name: "Savage" },
    { id: 13, name: "Poetic" },
    { id: 14, name: "Unlikely" },
    { id: 15, name: "Grim" },
    { id: 16, name: "Intense" },
    { id: 17, name: "Calm" },
    { id: 18, name: "Graceful" },
    { id: 19, name: "Brutal" },
    { id: 20, name: "Elegant" },
    { id: 21, name: "Majestic" },
    { id: 22, name: "Cold-blooded" },
    { id: 23, name: "Violent" },
    { id: 24, name: "Gory" },
    { id: 26, name: "Dark Humor" },
    { id: 27, name: "Raunchy" },
    { id: 28, name: "Morbid" },
    { id: 29, name: "Crude" },
    { id: 30, name: "Vulgar" },
    { id: 31, name: "Explicit" },
  ];

  const attackTypes = [
    { id: 1, name: "Melee" },
    { id: 2, name: "Ranged" },
    { id: 3, name: "Magic" },
  ];

  const classTypes = [
    { id: 1, name: "Artificer" },
    { id: 2, name: "Barbarian" },
    { id: 3, name: "Bard" },
    { id: 4, name: "Cleric" },
    { id: 5, name: "Druid" },
    { id: 6, name: "Fighter" },
    { id: 7, name: "Monk" },
    { id: 8, name: "Paladin" },
    { id: 9, name: "Ranger" },
    { id: 10, name: "Rogue" },
    { id: 11, name: "Sorcerer" },
    { id: 12, name: "Warlock" },
    { id: 13, name: "Wizard" },
  ];

  const rangedWeapons = [
    { id: 1, name: "Javelin" },
    { id: 2, name: "Light Crossbow" },
    { id: 3, name: "Dart" },
    { id: 4, name: "Shortbow" },
    { id: 5, name: "Sling" },
    { id: 6, name: "Blowgun" },
    { id: 7, name: "Hand Crossbow" },
    { id: 8, name: "Heavy Crossbow" },
    { id: 9, name: "Longbow" },
    { id: 10, name: "Throwing Axe" },
    { id: 12, name: "Throwing Knife" },
    { id: 13, name: "Net" },
    { id: 14, name: "Throwing Star" },
  ];

  const meleeWeapons = [
    { id: 1, name: "Club" },
    { id: 2, name: "Dagger" },
    { id: 3, name: "Greatclub" },
    { id: 4, name: "Handaxe" },
    { id: 5, name: "Light Hammer" },
    { id: 6, name: "Mace" },
    { id: 7, name: "Quarterstaff" },
    { id: 8, name: "Sickle" },
    { id: 9, name: "Spear" },
    { id: 10, name: "Battleaxe" },
    { id: 11, name: "Flail" },
    { id: 12, name: "Glaive" },
    { id: 13, name: "Greataxe" },
    { id: 14, name: "Greatsword" },
    { id: 15, name: "Halberd" },
    { id: 16, name: "Longsword" },
    { id: 17, name: "Maul" },
    { id: 18, name: "Morningstar" },
    { id: 19, name: "Pike" },
    { id: 20, name: "Rapier" },
    { id: 21, name: "Scimitar" },
    { id: 22, name: "Shortsword" },
    { id: 23, name: "Trident" },
    { id: 24, name: "War Pick" },
    { id: 25, name: "Warhammer" },
    { id: 26, name: "Whip" },
    { id: 27, name: "Fists" },
    { id: 28, name: "Claws" },
    { id: 29, name: "Teeth" },
    { id: 30, name: "Tail" },
    { id: 31, name: "Feet" },
  ];

  const handleToggleEnemyState = (id) => {
    const weaponString = weaponType ? `${weaponType.toLowerCase()}` : "fists";
    setEnemies((prevEnemies) =>
      prevEnemies.map((enemy) =>
        enemy.id === id
          ? {
              ...enemy,
              isAlive: !enemy.isAlive,
              causeOfDeath: `Death by ${weaponString}`,
            }
          : enemy
      )
    );
    setEnemiesToDelete((prevEnemiesToDelete) =>
      prevEnemiesToDelete.includes(id)
        ? prevEnemiesToDelete.filter((enemyId) => enemyId !== id)
        : [...prevEnemiesToDelete, id]
    );
  };

  const handleKillEnemies = async () => {
    setIsLoading(true);
    setEnemies((prevEnemies) =>
      prevEnemies.filter((enemy) => !enemiesToDelete.includes(enemy.id))
    );

    const freshlyKilledEnemies = enemies
      .filter((enemy) => enemiesToDelete.includes(enemy.id))
      .map((enemy) => enemy.name);

    let enemyNames = freshlyKilledEnemies.reduce((acc, enemy) => {
      if (!acc[enemy]) {
        acc[enemy] = 1;
      } else {
        acc[enemy]++;
      }
      return acc;
    }, {});

    enemyNames = Object.entries(enemyNames).map(([name, count]) => {
      return count > 1 ? `${count} ${name}s` : addArticle(name);
    });

    const enemyString =
      enemyNames.length > 1
        ? `a party of ${enemyNames.join(", ")}`
        : enemyNames[0];

    const weaponString = weaponType
      ? addArticle(weaponType).toLowerCase()
      : "your fists";
    const isCombatOverString = isCombatOver
      ? "and the battle is over"
      : "and the battle is still raging";
    const environmentString = environmentType
      ? ` The fight takes place in ${environmentType.toLowerCase()}.`
      : "";
    const toneString = tone
      ? ` The tone is ${addArticle(tone).toLowerCase()}.`
      : "";
    // const prompt = `You${
    //   classType ? `, ${addArticle(classType)},` : " "
    // } killed ${enemyString} with ${weaponString} ${isCombatOverString}.${environmentString}${toneString} It should sound natural and human, creative, be in first person and present tense, be brief, 2-3 sentences max but can be less, but cool and action packed, and violent.`;

    const prompt = `Describe a graphic and impactful killing blow delivered by ${
      classType ? addArticle(classType) : "an adventurer"
    } using ${weaponString} against ${enemyString}. Include details about the weapon's motion, the physical damage inflicted, the enemy's reaction, the effect on the environment, and the character's emotional state. Keep it brief and natural (2-3 sentences max), in first person, and in present tense. ${isCombatOverString}${environmentString}${toneString}`;

    let res = await Combat.generateCombatDescription(prompt);
    setDescription(res.description);
    setGraveyard((prevGraveyard) =>
      prevGraveyard.concat(
        enemies
          .filter((enemy) => enemiesToDelete.includes(enemy.id))
          .map((enemy) => ({ ...enemy, description: res.description }))
      )
    );

    setEnemiesToDelete([]);
    setIsLoading(false);
  };

  const addEnemy = (enemy) => {
    console.log(enemy);
    const newEnemy = {
      id: enemies.length + 1,
      name: enemy,
      isAlive: true,
      causeOfDeath: null,
    };
    setEnemies((prevEnemies) => [...prevEnemies, newEnemy]);
  };

  return (
    <div className="combat-description-page">
      <div className="additional-info">
        <h2>Combat Info</h2>

        <Checkbox
          label="Is Combat Over?"
          checked={isCombatOver}
          onChange={setIsCombatOver}
        />

        <Autocomplete
          label="Environment Type"
          searchOptions={environmentTypes}
          setValue={setEnvironmentType}
          clearAfter={false}
          backgroundColor="var(--background-color)"
        />

        <Autocomplete
          label="Tone"
          searchOptions={tones}
          setValue={setTone}
          clearAfter={false}
          backgroundColor="var(--background-color)"
        />
      </div>
      <div className="character-info">
        <h2>Your Character</h2>
        <Autocomplete
          label="Class"
          searchOptions={classTypes}
          setValue={setClassType}
          clearAfter={false}
          backgroundColor="var(--background-color)"
        />
        <Autocomplete
          label="Attack Type"
          searchOptions={attackTypes}
          setValue={setAttackType}
          clearAfter={false}
          backgroundColor="var(--background-color)"
        />
        <div
          className={`${attackType ? "visible" : "hidden"} weapon-spell-select`}
        >
          <Autocomplete
            label={
              attackType.toLowerCase() === "melee" ||
              attackType.toLowerCase() === "ranged"
                ? "Weapon"
                : "Spell"
            }
            searchOptions={
              attackType === "Melee" ? meleeWeapons : rangedWeapons
            }
            service={attackType === "Magic" ? SpellData : null}
            setValue={setWeaponType}
            clearAfter={false}
            backgroundColor="var(--background-color)"
          />
        </div>
      </div>
      <div className="enemies-info">
        <h2>Enemies</h2>
        <label>
          <Autocomplete
            label="Add Enemies"
            service={MonsterData}
            setValue={addEnemy}
          />
        </label>
        <div className="enemies-list">
          {enemies.map((enemy) => (
            <div
              key={enemy.id}
              className={`enemy ${enemy.isAlive ? "alive" : "dead"}`}
            >
              {enemy.name}
              <button
                className="kill-button"
                onClick={() => handleToggleEnemyState(enemy.id)}
              >
                {enemy.isAlive ? "Kill" : "Oops..."}
              </button>
            </div>
          ))}
        </div>
        <button
          className="kill-button"
          onClick={handleKillEnemies}
          disabled={enemiesToDelete.length === 0}
        >
          Kill Enemies
        </button>
      </div>
      <div className="graveyard">
        <h2>Combat Log</h2>
        {graveyard.map((enemy) => (
          <div key={enemy.id} className="enemy dead">
            <p>Name: {enemy.name}</p>
            <p>Cause of Death: {enemy.causeOfDeath}</p>
          </div>
        ))}
      </div>
      <div className="description">
        <h2>Description</h2>
        <p>{description}</p>

        {isLoading && (
          <div className="loader-container">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}

export default CombatDescriptionPage;
