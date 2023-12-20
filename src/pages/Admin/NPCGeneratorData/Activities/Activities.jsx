import React, { useEffect, useState } from "react";
import Activity from "../../../../services/activity.service";
import Grid from "../../../../components/Grid/Grid";

function Activities({ value, index }) {
  const [activities, setActivities] = useState([]);
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
    fetchActivities();

    return () => {
      fetchActivities();
    };
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    let data = await Activity.getActivities();
    setActivities(data);
    setLoading(false);
  };

  const handleEdit = async (activity) => {
    if (activity.id <= activities.at(-1).id) {
      await Activity.update(activity);
    } else {
      let res = await Activity.create(activity);
      setActivities((current) => {
        return [...current, res];
      });
    }
  };

  const handleDelete = async (id) => {
    await Activity.deleteActivity(id);
    setActivities((oldActivities) => {
      return oldActivities.filter((activity) => activity.id !== id);
    });
  };

  if (loading) return "loading";

  return (
    <div className="admin-container" hidden={value !== index}>
      <h3>Total Activities: {activities.length}</h3>
      <Grid
        initialRows={activities}
        initialColumns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        options={{ allowDeleting: true, allowEditing: true }}
      />
    </div>
  );
}

export default Activities;
