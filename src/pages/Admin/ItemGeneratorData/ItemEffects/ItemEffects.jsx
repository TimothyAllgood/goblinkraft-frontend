import React, { useEffect, useState } from "react";
import Grid from "../../../../components/Grid/Grid";
import ItemEffect from "../../../../services/itemEffect.service";

function ItemEffects({ value, index }) {
  const [itemEffects, setItemEffects] = useState([]);
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
      field: "itemType",
      headerName: "Item Type",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueGetter: (option) => {
        const value = option?.value || "";
        return value;
      },
      valueOptions: [
        { value: "generic", label: "Generic" },
        { value: "defensive", label: "Defensive" },
        { value: "offensive", label: "Offensive" },
        { value: "armor", label: "Armor" },
        { value: "shield", label: "Shield" },
        { value: "meleeWeapon", label: "Melee Weapon" },
        { value: "rangedWeapon", label: "Ranged Weapon" },
        { value: "ring", label: "Ring" },
        { value: "rod", label: "Rod" },
        { value: "staff", label: "Staff" },
        { value: "wondrous", label: "Wondrous" },
        { value: "potion", label: "Potion" },
      ],

      valueSetter: (params) => {
        const newRow = {
          ...params.row,
          itemType: params.value,
        };
        return newRow;
      },
    },
    {
      field: "affixType",
      headerName: "Affix",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueGetter: (option) => {
        const value = option?.value || "";
        return value;
      },
      valueOptions: [
        { value: "prefix", label: "Prefix" },
        { value: "suffix", label: "Suffix" },
      ],
      valueSetter: (params) => {
        const newRow = {
          ...params.row,
          affixType: params.value,
        };
        return newRow;
      },
    },
    {
      field: "rarity",
      headerName: "Rarity",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueGetter: (option) => {
        const value = option?.value || "";
        return value;
      },
      valueOptions: [
        { value: "UNCOMMON", label: "Uncommon" },
        { value: "COMMON", label: "Common" },
        { value: "RARE", label: "Rare" },
        { value: "VERYRARE", label: "Very Rare" },
        { value: "LEGENDARY", label: "Legendary" },
      ],
      valueSetter: (params) => {
        const newRow = {
          ...params.row,
          rarity: params.value,
        };
        return newRow;
      },
    },
  ];

  useEffect(() => {
    fetchItemEffects();
  }, []);

  const fetchItemEffects = async () => {
    setLoading(true);
    let data = await ItemEffect.getItemEffects();
    setItemEffects(data);
    setLoading(false);
  };

  const handleEdit = async (itemEffect) => {
    if (itemEffect.id <= itemEffects?.at(-1)?.id && itemEffect.id > 0) {
      await ItemEffect.update(itemEffect);
    } else {
      let res = await ItemEffect.create(itemEffect);
      setItemEffects([...itemEffects, res]);
    }
  };

  const handleDelete = async (id) => {
    await ItemEffect.deleteItemEffect(id);
    setItemEffects((oldItemEffects) => {
      return oldItemEffects.filter((itemEffect) => itemEffect.id !== id);
    });
  };

  if (loading) return "loading";

  return (
    <div className="admin-container" hidden={value !== index}>
      <div className="total">
        <h3>Total Effects: {itemEffects.length}</h3>
      </div>
      <Grid
        initialRows={itemEffects}
        initialColumns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        options={{ allowDeleting: true, allowEditing: true }}
      />
    </div>
  );
}

export default ItemEffects;
