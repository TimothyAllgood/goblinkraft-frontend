import React, { useEffect, useState } from "react";
import Grid from "../../../../components/Grid/Grid";
import TavernRumor from "../../../../services/admin/generatorData/tavern/tavernRumor.service";

function TavernRumors({ value, index }) {
  const [tavernRumors, setTavernRumors] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: true,
    },
  ];

  useEffect(() => {
    fetchTavernRumors();
  }, []);

  const fetchTavernRumors = async () => {
    setLoading(true);
    let data = await TavernRumor.getTavernRumors();
    setTavernRumors(data);
    setLoading(false);
  };

  const findDuplicates = () => {
    const names = tavernRumors.map(function (item) {
      return item.name;
    });
    const duplicateNames = names.filter(
      (item, index) => names.indexOf(item) !== index
    );

    let duplicates = duplicateNames.map((name) => {
      return tavernRumors.find((item) => item.name === name);
    });

    return duplicates;
  };

  let hasDuplicates = findDuplicates();

  const handleEdit = async (tavernRumor) => {
    if (tavernRumor.id <= tavernRumors?.at(-1)?.id && tavernRumor.id >= 0) {
      await TavernRumor.update(tavernRumor);
    } else {
      let res = await TavernRumor.create(tavernRumor);
      setTavernRumors([...tavernRumors, res]);
    }
  };

  const handleDelete = async (id) => {
    await TavernRumor.deleteTavernRumor(id);
    setTavernRumors((oldTavernRumors) => {
      return oldTavernRumors.filter((tavernRumor) => tavernRumor.id !== id);
    });
  };

  if (loading) return "loading";

  return (
    <div className="admin-container" hidden={value !== index}>
      <div className="total">
        <h3>Total Rumors: {tavernRumors.length}</h3>
        {hasDuplicates?.length > 0 && (
          <>
            <p className="bold">Duplicates Found</p>
            {hasDuplicates.map((duplicate) => {
              return (
                <div key={duplicate.id}>
                  <p>
                    {duplicate.id}: {duplicate.name}
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
      <Grid
        initialRows={tavernRumors}
        initialColumns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        options={{ allowDeleting: true, allowEditing: true }}
      />
    </div>
  );
}

export default TavernRumors;
