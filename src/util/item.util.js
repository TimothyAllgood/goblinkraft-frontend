export default class ItemUtil {
  static buildItemName = (item) => {
    if (item.effects?.length > 0) {
      let effectAffix = item.effects[0];
      let name = item.type;
      if (effectAffix?.affixType === "prefix") {
        name = effectAffix.name + " " + name;
      }

      if (effectAffix?.affixType === "suffix") {
        name = name + " " + effectAffix.name;
      }

      return name;
    }
  };

  static getRarity = (item) => {
    let weight = 0;

    const rarities = {
      UNCOMMON: 1,
      COMMON: 2,
      RARE: 3,
      VERYRARE: 4,
      LEGENDARY: 5,
    };
    if (item) {
      const itemEffects = item.effects;

      itemEffects?.forEach((effect) => {
        weight = weight + rarities[effect.rarity];
      });
      let rarity = Object.entries(rarities)
        .find((r) => r[1] >= weight)[0]
        .toLowerCase();
      if (rarity === "veryrare") {
        rarity = "Very Rare";
      }
      return rarity;
    }
  };

  static getModifier = (number) => {
    return Math.floor((number - 10) / 2);
  };
}
