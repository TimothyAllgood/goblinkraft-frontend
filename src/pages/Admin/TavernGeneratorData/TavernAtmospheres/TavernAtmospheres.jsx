import React, { useEffect, useState } from "react";
import Grid from "../../../../components/Grid/Grid";
import TavernAtmosphere from "../../../../services/admin/generatorData/tavern/tavernAtmosphere.service";

function TavernAtmospheres({ value, index }) {
  const [tavernAtmospheres, setTavernAtmospheres] = useState([]);
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

    {
      field: "quality",
      headerName: "Quality",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueGetter: (option) => {
        const value = option?.value || "";
        return value;
      },
      valueOptions: [
        { value: "any", label: "Any" },
        { value: "squalid", label: "Squalid" },
        { value: "poor", label: "Poor" },
        { value: "modest", label: "Modest" },
        { value: "comfortable", label: "Comfortable" },
        { value: "prosperous", label: "Prosperous" },
        { value: "extravagant", label: "Extravagant" },
        { value: "opulent", label: "Opulent" },
      ],
      valueSetter: (params) => {
        const newRow = {
          ...params.row,
          quality: params.value,
        };
        return newRow;
      },
    },
  ];

  useEffect(() => {
    fetchTavernAtmospheres();
  }, []);

  const fetchTavernAtmospheres = async () => {
    setLoading(true);
    let data = await TavernAtmosphere.getTavernAtmospheres();
    setTavernAtmospheres(data);
    setLoading(false);
  };

  const findDuplicates = () => {
    const names = tavernAtmospheres.map(function (item) {
      return item.name;
    });
    const duplicateNames = names.filter(
      (item, index) => names.indexOf(item) !== index
    );

    let duplicates = duplicateNames.map((name) => {
      return tavernAtmospheres.find((item) => item.name === name);
    });

    return duplicates;
  };

  let hasDuplicates = findDuplicates();

  const handleEdit = async (tavernAtmosphere) => {
    if (
      tavernAtmosphere.id <= tavernAtmospheres?.at(-1)?.id &&
      tavernAtmosphere.id >= 0
    ) {
      await TavernAtmosphere.update(tavernAtmosphere);
    } else {
      let res = await TavernAtmosphere.create(tavernAtmosphere);
      setTavernAtmospheres([...tavernAtmospheres, res]);
    }
  };

  const handleDelete = async (id) => {
    await TavernAtmosphere.deleteTavernAtmosphere(id);
    setTavernAtmospheres((oldTavernAtmospheres) => {
      return oldTavernAtmospheres.filter(
        (tavernAtmosphere) => tavernAtmosphere.id !== id
      );
    });
  };

  if (loading) return "loading";

  return (
    <div className="admin-container" hidden={value !== index}>
      <div className="total">
        <h3>
          Total Squalid Atmospheres:{" "}
          {
            tavernAtmospheres.filter((item) => item.quality === "squalid")
              .length
          }
        </h3>
        <h3>
          Total Poor Atmospheres:{" "}
          {tavernAtmospheres.filter((item) => item.quality === "poor").length}
        </h3>
        <h3>
          Total Modest Atmospheres:{" "}
          {tavernAtmospheres.filter((item) => item.quality === "modest").length}
        </h3>
        <h3>
          Total Comfortable Atmospheres:{" "}
          {
            tavernAtmospheres.filter((item) => item.quality === "comfortable")
              .length
          }
        </h3>
        <h3>
          Total Prosperous Atmospheres:{" "}
          {
            tavernAtmospheres.filter((item) => item.quality === "prosperous")
              .length
          }
        </h3>
        <h3>
          Total Extravagant Atmospheres:{" "}
          {
            tavernAtmospheres.filter((item) => item.quality === "extravagant")
              .length
          }
        </h3>
        <h3>
          Total Opulent Atmospheres:{" "}
          {
            tavernAtmospheres.filter((item) => item.quality === "opulent")
              .length
          }
        </h3>
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
        initialRows={tavernAtmospheres}
        initialColumns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        options={{ allowDeleting: true, allowEditing: true }}
      />
    </div>
  );
}

export default TavernAtmospheres;
