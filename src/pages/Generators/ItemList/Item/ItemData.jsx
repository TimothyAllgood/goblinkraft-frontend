import { Divider, Typography } from "@mui/material";
import React from "react";
import "./ItemData.css";
import ItemUtil from "../../../../util/item.util";

function ItemData({ item }) {
  return (
    <div className="item-card">
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
      <Divider />
      <div className="description">
        <div className="effects">
          {item.effects.map((effect) => {
            return <p>{effect.description}</p>;
          })}
        </div>
        <div className="curse">
          <Typography sx={{ fontWeight: "bold" }}>
            {item.curse?.name}
          </Typography>
          <p>{item.curse?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemData;
