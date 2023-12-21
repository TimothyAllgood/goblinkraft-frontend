import React, { useEffect, useState } from "react";
import PlotHookData from "../../../../services/plotHookData.service";
import Grid from "../../../../components/Grid/Grid";

function PlotHooks({ value, index }) {
  const [plotHooks, setPlotHooks] = useState([]);
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
      field: "description",
      headerName: "Description",
      flex: 1,
      editable: true,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueGetter: (option) => {
        const value = option?.value || "";
        return value;
      },
      valueOptions: [
        { value: "generic", label: "Generic" },
        { value: "npc", label: "Npc" },
        { value: "player", label: "Player" },
      ],

      valueSetter: (params) => {
        const newRow = {
          ...params.row,
          type: params.value,
        };
        return newRow;
      },
    },
  ];

  useEffect(() => {
    fetchPlotHooks();
  }, []);

  const fetchPlotHooks = async () => {
    setLoading(true);
    let data = await PlotHookData.getPlotHooks();
    setPlotHooks(data);
    setLoading(false);
  };

  const handleEdit = async (plotHook) => {
    if (plotHook.id <= plotHooks?.at(-1)?.id && plotHook.id > 0) {
      console.log("updating");
      await PlotHookData.update(plotHook);
    } else {
      console.log("creating");
      let res = await PlotHookData.create(plotHook);
      setPlotHooks([...plotHooks, res]);
    }
  };

  const handleDelete = async (id) => {
    await PlotHookData.deletePlotHook(id);
    setPlotHooks((oldPlotHooks) => {
      return oldPlotHooks.filter((plotHook) => plotHook.id !== id);
    });
  };

  if (loading) return "loading";

  return (
    <div className="admin-container" hidden={value !== index}>
      <div className="total">
        <h3>Total Plot Hooks: {plotHooks.length}</h3>
      </div>
      <Grid
        initialRows={plotHooks}
        initialColumns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        options={{ allowDeleting: true, allowEditing: true }}
      />
    </div>
  );
}

export default PlotHooks;
