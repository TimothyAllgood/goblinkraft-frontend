import React from "react";
import ItemUtil from "../../../../util/item.util";
import "./Item.css";

function Item({ item }) {
  return (
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
      <div className="description">
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
  );
}

export default Item;
