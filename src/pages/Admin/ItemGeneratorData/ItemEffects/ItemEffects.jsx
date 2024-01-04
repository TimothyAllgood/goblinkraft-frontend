import React, { useEffect, useState } from "react";
import Grid from "../../../../components/Grid/Grid";
import ItemEffect from "../../../../services/admin/generatorData/item/itemEffect.service";
import "./ItemEffects.css";

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
        { value: "jewelry", label: "Jewelry" },
        { value: "belt", label: "Belt" },
        { value: "gloves", label: "Gloves" },
        { value: "boots", label: "Boots" },
        { value: "instrument", label: "Instrument" },
        { value: "cloak", label: "Cloak" },
        { value: "figurine", label: "Figurine" },
        { value: "potion", label: "Potion" },
        { value: "poison", label: "Poison" },
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
    if (itemEffect.id <= itemEffects?.at(-1)?.id && itemEffect.id >= 0) {
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

  const findDuplicates = () => {
    const names = itemEffects.map(function (item) {
      return item.name;
    });
    const duplicateNames = names.filter(
      (item, index) => names.indexOf(item) !== index
    );

    let duplicates = duplicateNames.map((name) => {
      return itemEffects.find((item) => item.name === name);
    });

    return duplicates;
  };

  let hasDuplicates = findDuplicates();

  if (loading) return "loading";

  return (
    <div className="admin-container" hidden={value !== index}>
      <div className="total">
        <h3>
          Total Armor Effects:{" "}
          {itemEffects.filter((item) => item.itemType === "armor").length}
        </h3>
        <h3>
          Total Melee Weapon Effects:{" "}
          {itemEffects.filter((item) => item.itemType === "meleeWeapon").length}
        </h3>
        <h3>
          Total Ranged Weapon Effects:{" "}
          {
            itemEffects.filter((item) => item.itemType === "rangedWeapon")
              .length
          }
        </h3>
        <h3>
          Total Potion Effects:{" "}
          {itemEffects.filter((item) => item.itemType === "potion").length}
        </h3>
        <h3>
          Total Poison Effects:{" "}
          {itemEffects.filter((item) => item.itemType === "poison").length}
        </h3>
        <h3>
          Total Ring Effects:{" "}
          {itemEffects.filter((item) => item.itemType === "ring").length}
        </h3>
        <h3>
          Total Rod Effects:{" "}
          {itemEffects.filter((item) => item.itemType === "rod").length}
        </h3>
        <h3>
          Total Staff Effects:{" "}
          {itemEffects.filter((item) => item.itemType === "staff").length}
        </h3>
        <h3>
          Total Shield Effects:{" "}
          {itemEffects.filter((item) => item.itemType === "shield").length}
        </h3>
        <h3>
          Total Cloak Effects:{" "}
          {itemEffects.filter((item) => item.itemType === "cloak").length}
        </h3>
        <h3>
          Total Boots Effects:{" "}
          {itemEffects.filter((item) => item.itemType === "boots").length}
        </h3>
        <h3>
          Total Gloves Effects:{" "}
          {itemEffects.filter((item) => item.itemType === "gloves").length}
        </h3>
        <h3>
          Total Jewelry Effects:{" "}
          {itemEffects.filter((item) => item.itemType === "jewelry").length}
        </h3>
        <h3>
          Total Figurine Effects:{" "}
          {itemEffects.filter((item) => item.itemType === "figurine").length}
        </h3>
        <h3>
          Total Instrument Effects:{" "}
          {itemEffects.filter((item) => item.itemType === "instrument").length}
        </h3>
        <h3>
          Total Belt Effects:{" "}
          {itemEffects.filter((item) => item.itemType === "belt").length}
        </h3>
        <h3>
          Total Generic Effects:{" "}
          {itemEffects.filter((item) => item.itemType === "generic").length}
        </h3>
        <h3>
          Total Offensive Effects:{" "}
          {itemEffects.filter((item) => item.itemType === "offensive").length}
        </h3>
        <h3>
          Total Defensive Effects:{" "}
          {itemEffects.filter((item) => item.itemType === "defensive").length}
        </h3>
        {hasDuplicates?.length > 0 && (
          <>
            <p className="bold">Duplicates Found: {hasDuplicates.length}</p>
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
