import React, { useEffect, useState } from "react";
import Grid from "../../../../components/Grid/Grid";
import MonsterData from "../../../../services/admin/generatorData/monster/monsterData.service";
import { Link } from "react-router-dom";

function MonsterList({ value, index }) {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: true,
    },
    {
      field: "source",
      headerName: "Source",
      flex: 1,
      editable: true,
    },
    {
      field: "sourcePage",
      headerName: "Page",
      flex: 1,
      editable: true,
    },
  ];

  useEffect(() => {
    fetchMonsters();
  }, []);

  const fetchMonsters = async () => {
    setLoading(true);
    let data = await MonsterData.getMonsters();
    setMonsters(data);
    setLoading(false);
  };

  const handleEdit = async (monster) => {
    if (monster.id <= monsters?.at(-1)?.id && monster.id >= 0) {
      try {
        await MonsterData.update(monster);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        let res = await MonsterData.create(monster);
        setMonsters([...monsters, res]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async (id) => {
    await MonsterData.deleteMonsterAbility(id);
    setMonsterAbilities((oldMonsters) => {
      return oldMonsters.filter((monster) => monster.id !== id);
    });
  };

  if (loading) return "loading";

  return (
    <div className="admin-container" hidden={value !== index}>
      <div className="total">
        <h3>Total Monsters: {monsters.length}</h3>
        <Grid
          initialRows={monsters}
          initialColumns={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          options={{ allowDeleting: true, allowEditing: true }}
        />
      </div>
    </div>
  );
}

export default MonsterList;
