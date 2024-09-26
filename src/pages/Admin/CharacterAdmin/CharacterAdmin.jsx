import React, { useEffect, useMemo, useState } from "react";
import DataGridComponent from "../../../components/DataGrid/DataGrid";
import Tabs from "../../../components/Tabs/Tabs";
import { useLocalStorage } from "@uidotdev/usehooks";
import LineGraph from "../../../components/LineGraph/LineGraph";
import Report from "../../../services/admin/report.service";
import Backstory from "../../../services/admin/generatorData/backstory/backstory.service";
import CharacterTrait from "../../../services/admin/generatorData/characterTrait/characterTrait";
import ClassTrait from "../../../services/admin/generatorData/classTrait/classTrait";

function CharacterAdmin() {
  const [role] = useLocalStorage("role");
  const isAdmin = role === "ADMIN";
  const tabs = [
    { label: "Backstories", component: <DataGridComponent type={Backstory} /> },
    {
      label: "Character Traits",
      component: <DataGridComponent type={CharacterTrait} />,
    },
    {
      label: "Class Traits",
      component: <DataGridComponent type={ClassTrait} />,
    },
  ];

  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const res = await Report.getAll("Character Generator");
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
                <h3>Total Visits to Character Generator</h3>
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

export default CharacterAdmin;
