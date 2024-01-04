import React, { useEffect, useState } from "react";
import Grid from "../../../../components/Grid/Grid";
import MenuItem from "../../../../services/admin/generatorData/tavern/menuItem.service";

function MenuItems({ value, index }) {
  const [menuItems, setMenuItems] = useState([]);
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
      flex: 2,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      editable: true,
    },
    {
      field: "type",
      headerName: "Item Type",
      editable: true,
      type: "singleSelect",
      valueGetter: (option) => {
        const value = option?.value || "";
        return value;
      },
      valueOptions: [
        { value: "food", label: "Food" },
        { value: "drink", label: "Drink" },
      ],

      valueSetter: (params) => {
        const newRow = {
          ...params.row,
          type: params.value,
        };
        return newRow;
      },
    },
    {
      field: "quality",
      headerName: "Quality",
      editable: true,
      type: "singleSelect",
      valueGetter: (option) => {
        const value = option?.value || "";
        return value;
      },
      valueOptions: [
        { value: "common", label: "Common" },
        { value: "exotic", label: "Exotic" },
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
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    let data = await MenuItem.getMenuItems();
    setMenuItems(data);
    setLoading(false);
  };

  const findDuplicates = () => {
    const names = menuItems.map(function (item) {
      return item.name;
    });
    const duplicateNames = names.filter(
      (item, index) => names.indexOf(item) !== index
    );

    let duplicates = duplicateNames.map((name) => {
      return menuItems.find((item) => item.name === name);
    });

    return duplicates;
  };

  let hasDuplicates = findDuplicates();

  const handleEdit = async (menuItem) => {
    if (menuItem.id <= menuItems?.at(-1)?.id && menuItem.id >= 0) {
      await MenuItem.update(menuItem);
    } else {
      let res = await MenuItem.create(menuItem);
      setMenuItems([...menuItems, res]);
    }
  };

  const handleDelete = async (id) => {
    await MenuItem.deleteMenuItem(id);
    setMenuItems((oldMenuItems) => {
      return oldMenuItems.filter((menuItem) => menuItem.id !== id);
    });
  };

  if (loading) return "loading";

  return (
    <div className="admin-container" hidden={value !== index}>
      <div className="total">
        <h3>
          Total Common Food Items:{" "}
          {
            menuItems.filter(
              (item) => item.quality === "common" && item.type === "food"
            ).length
          }
        </h3>
        <h3>
          Total Exotic Food Items:{" "}
          {
            menuItems.filter(
              (item) => item.quality === "exotic" && item.type === "food"
            ).length
          }
        </h3>
        <h3>
          Total Common Drink Items:{" "}
          {
            menuItems.filter(
              (item) => item.quality === "common" && item.type === "drink"
            ).length
          }
        </h3>
        <h3>
          Total Exotic Drink Items:{" "}
          {
            menuItems.filter(
              (item) => item.quality === "exotic" && item.type === "drink"
            ).length
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
        initialRows={menuItems}
        initialColumns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        options={{ allowDeleting: true, allowEditing: true }}
      />
    </div>
  );
}

export default MenuItems;
