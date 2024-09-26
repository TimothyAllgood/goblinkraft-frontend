import React, { useEffect, useMemo, useState } from "react";
import DataGridComponent from "../../../components/DataGrid/DataGrid";
import Tabs from "../../../components/Tabs/Tabs";
import Activity from "../../../services/admin/generatorData/npc/activity.service";
import Quirk from "../../../services/admin/generatorData/npc/quirk.service";
import { useLocalStorage } from "@uidotdev/usehooks";
import LineGraph from "../../../components/LineGraph/LineGraph";
import Report from "../../../services/admin/report.service";

function NPCAdmin() {
  const [role] = useLocalStorage("role");
  const isAdmin = role === "ADMIN";
  const tabs = [
    { label: "Activities", component: <DataGridComponent type={Activity} /> },
    { label: "Attributes", component: <DataGridComponent type={Quirk} /> },
  ];

  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const res = await Report.getAll("NPC Generator");
    console.log(res);
    setReports(res);
  };

  return (
    <>
      {isAdmin && (
        <section className="admin-section">
          {reports.length > 0 && (
            <div className="admin-details">
              <LineGraph data={reports} />
              <div className="admin-details-info">
                <h3>Total Visits to NPC Generator</h3>
                <p>{reports.length}</p>
              </div>
            </div>
          )}
          <Tabs tabs={tabs} />
        </section>
      )}
      {!isAdmin && <p>You are not authorized to access this page.</p>}
    </>
  );
}

export default NPCAdmin;
