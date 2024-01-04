import React, { useEffect, useState } from "react";
import Grid from "../../../../components/Grid/Grid";
import MonsterAbility from "../../../../services/admin/generatorData/monster/monsterAbility.service";

function MonsterAbilities({ value, index }) {
  const [monsterAbilities, setMonsterAbilities] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "affix",
      headerName: "Affix",
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
      field: "cr",
      headerName: "CR Adjustment",
      type: "number",
      editable: true,
    },
    {
      field: "weight",
      headerName: "Weight",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueGetter: (option) => {
        const value = option?.value || "";
        return value;
      },
      valueOptions: [
        { value: "common", label: "Common" },
        { value: "rare", label: "Rare" },
        { value: "veryrare", label: "Very Rare" },
        { value: "legendary", label: "Legendary" },
      ],
      valueSetter: (params) => {
        const newRow = {
          ...params.row,
          weight: params.value,
        };
        return newRow;
      },
    },
  ];

  useEffect(() => {
    fetchMonsterAbilities();
  }, []);

  const fetchMonsterAbilities = async () => {
    setLoading(true);
    let data = await MonsterAbility.getMonsterAbilities();
    setMonsterAbilities(data);
    setLoading(false);
  };

  const findDuplicates = () => {
    const affixes = monsterAbilities.map(function (item) {
      return item.affix;
    });
    const duplicateAffixes = affixes.filter(
      (item, index) => affixes.indexOf(item) !== index
    );

    let duplicates = duplicateAffixes.map((affix) => {
      return monsterAbilities.find((item) => item.affix === affix);
    });

    return duplicates;
  };

  let hasDuplicates = findDuplicates();

  const handleEdit = async (monsterAbility) => {
    if (
      monsterAbility.id <= monsterAbilities?.at(-1)?.id &&
      monsterAbility.id >= 0
    ) {
      try {
        await MonsterAbility.update(monsterAbility);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        let res = await MonsterAbility.create(monsterAbility);
        setMonsterAbilities([...monsterAbilities, res]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async (id) => {
    await MonsterAbility.deleteMonsterAbility(id);
    setMonsterAbilities((oldMonsterAbilities) => {
      return oldMonsterAbilities.filter(
        (monsterAbility) => monsterAbility.id !== id
      );
    });
  };

  if (loading) return "loading";

  return (
    <div className="admin-container" hidden={value !== index}>
      <div className="total">
        <h3>Total Monster Abilities: {monsterAbilities.length}</h3>
        <h3>
          Total Common Abilities:{" "}
          {monsterAbilities.filter((item) => item.weight === "common").length}
        </h3>
        <h3>
          Total Rare Abilities:{" "}
          {monsterAbilities.filter((item) => item.weight === "rare").length}
        </h3>
        <h3>
          Total Very Rare Abilities:{" "}
          {monsterAbilities.filter((item) => item.weight === "veryrare").length}
        </h3>
        <h3>
          Total Legendary Abilities:{" "}
          {
            monsterAbilities.filter((item) => item.weight === "legendary")
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
                    {duplicate.id}: {duplicate.affix}
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
      <Grid
        initialRows={monsterAbilities}
        initialColumns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        options={{ allowDeleting: true, allowEditing: true }}
      />
    </div>
  );
}

export default MonsterAbilities;
