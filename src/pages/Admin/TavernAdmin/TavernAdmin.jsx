import React, { useEffect, useMemo, useState } from "react";
import DataGridComponent from "../../../components/DataGrid/DataGrid";
import Tabs from "../../../components/Tabs/Tabs";

import { useLocalStorage } from "@uidotdev/usehooks";
import LineGraph from "../../../components/LineGraph/LineGraph";
import Report from "../../../services/admin/report.service";
import MenuItem from "../../../services/admin/generatorData/tavern/menuItem.service";
import TavernAtmosphere from "../../../services/admin/generatorData/tavern/tavernAtmosphere.service";
import TavernEvent from "../../../services/admin/generatorData/tavern/tavernEvent.service";
import TavernFeature from "../../../services/admin/generatorData/tavern/tavernFeature.service";
import TavernRumor from "../../../services/admin/generatorData/tavern/tavernRumor.service";

function TavernAdmin() {
  const [role] = useLocalStorage("role");
  const isAdmin = role === "ADMIN";
  const tabs = [
    { label: "Menu Items", component: <DataGridComponent type={MenuItem} /> },
    {
      label: "Atmospheres",
      component: <DataGridComponent type={TavernAtmosphere} />,
    },
    { label: "Events", component: <DataGridComponent type={TavernEvent} /> },
    {
      label: "Features",
      component: <DataGridComponent type={TavernFeature} />,
    },
    { label: "Rumors", component: <DataGridComponent type={TavernRumor} /> },
  ];

  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const res = await Report.getAll("Tavern Generator");
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
                <h3>Total Visits to Tavern Generator</h3>
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

export default TavernAdmin;
