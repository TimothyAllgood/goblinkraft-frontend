import React, { useEffect, useState } from "react";
import Grid from "../../../../components/Grid/Grid";
import TavernEvent from "../../../../services/admin/generatorData/tavern/tavernEvent.service";

function TavernEvents({ value, index }) {
  const [tavernEvents, setTavernEvents] = useState([]);
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
    fetchTavernEvents();
  }, []);

  const fetchTavernEvents = async () => {
    setLoading(true);
    let data = await TavernEvent.getTavernEvents();
    setTavernEvents(data);
    setLoading(false);
  };

  const handleEdit = async (tavernEvent) => {
    if (tavernEvent.id <= tavernEvents?.at(-1)?.id && tavernEvent.id >= 0) {
      await TavernEvent.update(tavernEvent);
    } else {
      let res = await TavernEvent.create(tavernEvent);
      setTavernEvents([...tavernEvents, res]);
    }
  };

  const findDuplicates = () => {
    const names = tavernEvents.map(function (item) {
      return item.name;
    });
    const duplicateNames = names.filter(
      (item, index) => names.indexOf(item) !== index
    );

    let duplicates = duplicateNames.map((name) => {
      return tavernEvents.find((item) => item.name === name);
    });

    return duplicates;
  };

  let hasDuplicates = findDuplicates();

  const handleDelete = async (id) => {
    await TavernEvent.deleteTavernEvent(id);
    setTavernEvents((oldTavernEvents) => {
      return oldTavernEvents.filter((tavernEvent) => tavernEvent.id !== id);
    });
  };

  if (loading) return "loading";

  return (
    <div className="admin-container" hidden={value !== index}>
      <div className="total">
        <h3>
          Total Generic Events:{" "}
          {tavernEvents.filter((item) => item.quality === "any").length}
        </h3>
        <h3>
          Total Squalid Events:{" "}
          {tavernEvents.filter((item) => item.quality === "squalid").length}
        </h3>
        <h3>
          Total Poor Events:{" "}
          {tavernEvents.filter((item) => item.quality === "poor").length}
        </h3>
        <h3>
          Total Modest Events:{" "}
          {tavernEvents.filter((item) => item.quality === "modest").length}
        </h3>
        <h3>
          Total Comfortable Events:{" "}
          {tavernEvents.filter((item) => item.quality === "comfortable").length}
        </h3>
        <h3>
          Total Prosperous Events:{" "}
          {tavernEvents.filter((item) => item.quality === "prosperous").length}
        </h3>
        <h3>
          Total Extravagant Events:{" "}
          {tavernEvents.filter((item) => item.quality === "extravagant").length}
        </h3>
        <h3>
          Total Opulent Events:{" "}
          {tavernEvents.filter((item) => item.quality === "opulent").length}
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
        initialRows={tavernEvents}
        initialColumns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        options={{ allowDeleting: true, allowEditing: true }}
      />
    </div>
  );
}

export default TavernEvents;
