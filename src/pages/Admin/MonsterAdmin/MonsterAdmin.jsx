import React, { useEffect, useState } from "react";
import DataGridComponent from "../../../components/DataGrid/DataGrid";
import Tabs from "../../../components/Tabs/Tabs";
import MonsterAbility from "../../../services/admin/generatorData/monster/monsterAbility.service";
import MonsterData from "../../../services/admin/generatorData/monster/monsterData.service";
import LineGraph from "../../../components/LineGraph/LineGraph";
import Report from "../../../services/admin/report.service";
import { useLocalStorage } from "@uidotdev/usehooks";

function MonsterAdmin() {
  const [role] = useLocalStorage("role");
  const isAdmin = role === "ADMIN";
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

  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const res = await Report.getAll("Monster Generator");
    console.log(res);
    setReports(res);
  };
  return (
    <div>
      {isAdmin && (
        <section className="admin-section">
          {reports.length > 0 && (
            <div className="admin-details">
              <LineGraph data={reports} />
              <div className="admin-details-info">
                <h3>Total Visits to Monster Generator</h3>
                <p>{reports.length}</p>
              </div>
            </div>
          )}
          <Tabs tabs={tabs} />
        </section>
      )}
      {!isAdmin && <p>You are not authorized to access this page.</p>}
    </div>
  );
}

export default MonsterAdmin;
