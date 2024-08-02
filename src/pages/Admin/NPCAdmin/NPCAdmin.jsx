import React from "react";
import DataGridComponent from "../../../components/DataGrid/DataGrid";
import Tabs from "../../../components/Tabs/Tabs";
import Activity from "../../../services/admin/generatorData/npc/activity.service";
import Quirk from "../../../services/admin/generatorData/npc/quirk.service";

function NPCAdmin() {
  const tabs = [
    { label: "Activities", component: <DataGridComponent type={Activity} /> },
    { label: "Attributes", component: <DataGridComponent type={Quirk} /> },
  ];
  return (
    <section className="admin-section">
      <Tabs tabs={tabs} />
    </section>
  );
}

export default NPCAdmin;
