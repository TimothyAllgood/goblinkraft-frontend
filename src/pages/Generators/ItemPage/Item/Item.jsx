import React from "react";
import ItemUtil from "../../../../util/item.util";
import "./Item.css";

function Item({ item }) {
  // const fetchLore = async () => {
  //   setGeneratingLore(true);
  //   setOtherItemsGenerating(true);
  //   let effects = item.effects.map((effect) => effect.description).join(", ");
  //   let curse = item.curse
  //     ? `${item.curse.name}: ${item.curse.description}`
  //     : "";
  //   let res = await ItemService.generateItemLore({
  //     item: {
  //       name: ItemUtil.buildItemName(item),
  //       type: `${ItemUtil.getRarity(item)} ${item.itemType
  //         .replace(/([A-Z])/g, " $1")
  //         .trim()}`,
  //       effects: effects + curse,
  //     },
  //   });
  //   setLore(res.lore);
  //   setGeneratingLore(false);
  //   setOtherItemsGenerating(false);
  // };

  // const fetchArt = async () => {
  //   setGeneratingLore(true);
  //   setOtherItemsGenerating(true);
  //   let effects = item.effects.map((effect) => effect.description).join(", ");
  //   let curse = item.curse
  //     ? `${item.curse.name}: ${item.curse.description}`
  //     : "";
  //   let res = await ItemService.generateItemArt({
  //     item: {
  //       name: ItemUtil.buildItemName(item),
  //       type: `${ItemUtil.getRarity(item)} ${item.itemType
  //         .replace(/([A-Z])/g, " $1")
  //         .trim()}`,
  //       effects: effects + curse,
  //     },
  //   });
  //   setArt(res.art);
  //   setGeneratingArt(false);
  //   setOtherItemsGenerating(false);
  // };

  // const fetchDescription = async () => {
  //   setGeneratingDescription(true);
  //   setOtherItemsGenerating(true);
  //   let effects = item.effects.map((effect) => effect.description).join(", ");
  //   let curse = item.curse
  //     ? `${item.curse.name}: ${item.curse.description}`
  //     : "";
  //   let res = await ItemService.generateItemDescription({
  //     item: {
  //       name: ItemUtil.buildItemName(item),
  //       type: `${ItemUtil.getRarity(item)} ${item.itemType
  //         .replace(/([A-Z])/g, " $1")
  //         .trim()}`,
  //       effects: effects + curse,
  //     },
  //   });
  //   setDescription(res.description);
  //   setGeneratingDescription(false);
  //   setOtherItemsGenerating(false);
  // };

  return (
    <div className="single-item-container">
      <div className="item">
        <div className="item-header">
          <div className="name">
            <h3 className={item.curse ? " cursed" : ""}>
              {ItemUtil.buildItemName(item)}
            </h3>
          </div>
          <div className="details">
            <p className="capitalize">{ItemUtil.getRarity(item)}</p>
            <p className="capitalize">
              {item.itemType.replace(/([A-Z])/g, " $1").trim()}
            </p>
          </div>
        </div>
        <div className="description card-bg">
          <div className="effects">
            {item.effects.map((effect) => {
              return <p>{effect.description}</p>;
            })}
          </div>
          <div className="curse">
            <p className="bold">{item.curse?.name}</p>
            <p>{item.curse?.description}</p>
          </div>
        </div>
      </div>
      {/* <div className="item-buttons">
        <Button
          variant="dark"
          onClick={fetchLore}
          disabled={generatingLore || otherItemsGenerating}
        >
          {generatingLore ? "Generating..." : "Generate Lore"}
        </Button>
        <Button
          variant="dark"
          onClick={fetchArt}
          disabled={generatingArt || otherItemsGenerating}
        >
          {generatingArt ? "Generating..." : "Generate Art"}
        </Button>
        <Button
          variant="dark"
          onClick={fetchDescription}
          disabled={generatingDescription || otherItemsGenerating}
        >
          {generatingDescription ? "Generating..." : "Generate Description"}
        </Button>
      </div> */}
    </div>
  );
}

export default Item;
