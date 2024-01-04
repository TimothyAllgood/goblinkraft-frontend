import React, { useEffect, useState } from "react";
import Grid from "../../../../components/Grid/Grid";
import TavernFeature from "../../../../services/admin/generatorData/tavern/tavernFeature.service";

function TavernFeatures({ value, index }) {
  const [tavernFeatures, setTavernFeatures] = useState([]);
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
    fetchTavernFeatures();
  }, []);

  const findDuplicates = () => {
    const names = tavernFeatures.map(function (item) {
      return item.name;
    });
    const duplicateNames = names.filter(
      (item, index) => names.indexOf(item) !== index
    );

    let duplicates = duplicateNames.map((name) => {
      return tavernFeatures.find((item) => item.name === name);
    });

    return duplicates;
  };

  let hasDuplicates = findDuplicates();

  const fetchTavernFeatures = async () => {
    setLoading(true);
    let data = await TavernFeature.getTavernFeatures();
    setTavernFeatures(data);
    setLoading(false);
  };

  const handleEdit = async (tavernFeature) => {
    if (
      tavernFeature.id <= tavernFeatures?.at(-1)?.id &&
      tavernFeature.id >= 0
    ) {
      await TavernFeature.update(tavernFeature);
    } else {
      let res = await TavernFeature.create(tavernFeature);
      setTavernFeatures([...tavernFeatures, res]);
    }
  };

  const handleDelete = async (id) => {
    await TavernFeature.deleteTavernFeature(id);
    setTavernFeatures((oldTavernFeatures) => {
      return oldTavernFeatures.filter(
        (tavernFeature) => tavernFeature.id !== id
      );
    });
  };

  if (loading) return "loading";

  return (
    <div className="admin-container" hidden={value !== index}>
      <div className="total">
        <h3>
          Total Generic Features:{" "}
          {tavernFeatures.filter((item) => item.quality === "any").length}
        </h3>
        <h3>
          Total Squalid Features:{" "}
          {tavernFeatures.filter((item) => item.quality === "squalid").length}
        </h3>
        <h3>
          Total Poor Features:{" "}
          {tavernFeatures.filter((item) => item.quality === "poor").length}
        </h3>
        <h3>
          Total Modest Features:{" "}
          {tavernFeatures.filter((item) => item.quality === "modest").length}
        </h3>
        <h3>
          Total Comfortable Features:{" "}
          {
            tavernFeatures.filter((item) => item.quality === "comfortable")
              .length
          }
        </h3>
        <h3>
          Total Prosperous Features:{" "}
          {
            tavernFeatures.filter((item) => item.quality === "prosperous")
              .length
          }
        </h3>
        <h3>
          Total Extravagant Features:{" "}
          {
            tavernFeatures.filter((item) => item.quality === "extravagant")
              .length
          }
        </h3>
        <h3>
          Total Opulent Features:{" "}
          {tavernFeatures.filter((item) => item.quality === "opulent").length}
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
        initialRows={tavernFeatures}
        initialColumns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        options={{ allowDeleting: true, allowEditing: true }}
      />
    </div>
  );
}

export default TavernFeatures;
