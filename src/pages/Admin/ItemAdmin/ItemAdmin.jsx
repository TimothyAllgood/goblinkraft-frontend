import React, { useEffect, useMemo, useState } from "react";
import DataGridComponent from "../../../components/DataGrid/DataGrid";
import Tabs from "../../../components/Tabs/Tabs";
import { useLocalStorage } from "@uidotdev/usehooks";
import LineGraph from "../../../components/LineGraph/LineGraph";
import Report from "../../../services/admin/report.service";
import ItemEffect from "../../../services/admin/generatorData/item/itemEffect.service";
import ItemCurse from "../../../services/admin/generatorData/item/itemCurse.service";

function ItemAdmin() {
  const [role] = useLocalStorage("role");
  const isAdmin = role === "ADMIN";
  const tabs = [
    { label: "Effects", component: <DataGridComponent type={ItemEffect} /> },
    { label: "Curses", component: <DataGridComponent type={ItemCurse} /> },
  ];

  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const res = await Report.getAll("Item Generator");
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
                <h3>Total Visits to Item Generator</h3>
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

export default ItemAdmin;
