import { Divider } from "@mui/material";
import React from "react";
import "./ItemData.css";
import ItemUtil from "../../../../util/item.util";

function ItemData({ item }) {
  return (
    <div className="item-card">
      <div className="item-header">
        <div className="name">
          <h3>{ItemUtil.buildItemName(item)}</h3>
        </div>
        <div className="details">
          <p className="capitalize">{ItemUtil.getRarity(item)}</p>
        </div>
      </div>
      <Divider />
      <div className="effects">
        {item.effects.map((effect) => {
          return <p>{effect.description}</p>;
        })}
      </div>
    </div>
  );
}

export default ItemData;
