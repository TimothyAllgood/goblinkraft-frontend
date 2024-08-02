import React from "react";
import DataGridComponent from "../../../components/DataGrid/DataGrid";
import Tabs from "../../../components/Tabs/Tabs";
import MonsterAbility from "../../../services/admin/generatorData/monster/monsterAbility.service";
import MonsterData from "../../../services/admin/generatorData/monster/monsterData.service";

function MonsterAdmin() {
  const tabs = [
    {
      label: "Monster Abilities",
      component: <DataGridComponent type={MonsterAbility} />,
    },
    {
      label: "Monsters",
      component: <DataGridComponent type={MonsterData} />,
    },
  ];
  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
}

export default MonsterAdmin;
