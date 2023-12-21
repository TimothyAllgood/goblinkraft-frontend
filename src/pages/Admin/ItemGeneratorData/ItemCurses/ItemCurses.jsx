import React, { useEffect, useState } from "react";
import Grid from "../../../../components/Grid/Grid";
import ItemCurse from "../../../../services/admin/generatorData/item/itemCurse.service";

function ItemCurses({ value, index }) {
  const [itemCurses, setItemCurses] = useState([]);
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
    // {
    //   field: "itemType",
    //   headerName: "Item Type",
    //   flex: 1,
    //   editable: true,
    //   type: "singleSelect",
    //   valueGetter: (option) => {
    //     const value = option?.value || "";
    //     return value;
    //   },
    //   valueOptions: [
    //     { value: "armor", label: "Armor" },
    //     { value: "shield", label: "Shield" },
    //     { value: "meleeWeapon", label: "Melee Weapon" },
    //     { value: "rangedWeapon", label: "Ranged Weapon" },
    //     { value: "ring", label: "Ring" },
    //     { value: "rod", label: "Rod" },
    //     { value: "staff", label: "Staff" },
    //     { value: "wondrous", label: "Wondrous" },
    //     { value: "potion", label: "Potion" },
    //   ],

    //   valueSetter: (params) => {
    //     const newRow = {
    //       ...params.row,
    //       itemType: params.value,
    //     };
    //     return newRow;
    //   },
    // },
    // {
    //   field: "affixType",
    //   headerName: "Affix",
    //   flex: 1,
    //   editable: true,
    //   type: "singleSelect",
    //   valueGetter: (option) => {
    //     const value = option?.value || "";
    //     return value;
    //   },
    //   valueOptions: [
    //     { value: "prefix", label: "Prefix" },
    //     { value: "suffix", label: "Suffix" },
    //   ],
    //   valueSetter: (params) => {
    //     const newRow = {
    //       ...params.row,
    //       affixType: params.value,
    //     };
    //     return newRow;
    //   },
    // },
    {
      field: "severity",
      headerName: "Severity",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueGetter: (option) => {
        const value = option?.value || "";
        return value;
      },
      valueOptions: [
        { value: "MINOR", label: "Minor" },
        { value: "MAJOR", label: "Major" },
      ],
      valueSetter: (params) => {
        const newRow = {
          ...params.row,
          severity: params.value,
        };
        return newRow;
      },
    },
  ];

  useEffect(() => {
    fetchItemCurses();
  }, []);

  const fetchItemCurses = async () => {
    setLoading(true);
    let data = await ItemCurse.getItemCurses();
    setItemCurses(data);
    setLoading(false);
  };

  const handleEdit = async (itemCurse) => {
    if (itemCurse.id <= itemCurses?.at(-1)?.id && itemCurse.id > 0) {
      await ItemCurse.update(itemCurse);
    } else {
      let res = await ItemCurse.create(itemCurse);
      setItemCurses([...itemCurses, res]);
    }
  };

  const handleDelete = async (id) => {
    await ItemCurse.deleteItemCurse(id);
    setItemCurses((oldItemCurses) => {
      return oldItemCurses.filter((itemCurse) => itemCurse.id !== id);
    });
  };

  if (loading) return "loading";

  return (
    <div className="admin-container" hidden={value !== index}>
      <div className="total">
        <h3>Total Curses: {itemCurses.length}</h3>
      </div>
      <Grid
        initialRows={itemCurses}
        initialColumns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        options={{ allowDeleting: true, allowEditing: true }}
      />
    </div>
  );
}

export default ItemCurses;
