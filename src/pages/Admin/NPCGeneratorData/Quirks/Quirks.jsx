import React, { useEffect, useState } from "react";
import Quirk from "../../../../services/admin/generatorData/npc/quirk.service";
import Grid from "../../../../components/Grid/Grid";

function Quirks({ value, index }) {
  const [quirks, setQuirks] = useState([]);
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
      field: "info",
      headerName: "Info",
      flex: 1,
      editable: true,
    },
  ];

  useEffect(() => {
    fetchQuirks();
  }, []);

  const fetchQuirks = async () => {
    setLoading(true);
    let data = await Quirk.getQuirks();
    setQuirks(data);
    setLoading(false);
  };

  const handleEdit = async (quirk) => {
    if (quirk.id <= quirks.at(-1).id) {
      await Quirk.update(quirk);
    } else {
      let res = await Quirk.create(quirk);
      setQuirks([...quirks, res]);
    }
  };

  const handleDelete = async (id) => {
    await Quirk.deleteQuirk(id);
    setQuirks((oldQuirks) => {
      return oldQuirks.filter((quirk) => quirk.id !== id);
    });
  };

  if (loading) return "loading";

  return (
    <div className="admin-container" hidden={value !== index}>
      <div className="total">
        <h3>Total Quirks: {quirks.length}</h3>
      </div>
      <Grid
        initialRows={quirks}
        initialColumns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        options={{ allowDeleting: true, allowEditing: true }}
      />
    </div>
  );
}

export default Quirks;
