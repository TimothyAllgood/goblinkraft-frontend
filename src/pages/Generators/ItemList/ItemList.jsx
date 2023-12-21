import React, { useEffect, useState } from "react";
import Item from "../../../services/item.service";
import ItemData from "./Item/ItemData";
import "./ItemList.css";
import { Button } from "@mui/material";

function ItemList() {
  const [items, setItems] = useState({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    let res = await Item.generateItems();
    setItems(res.items);
  };

  return (
    <>
      <div className="button-container">
        <Button variant="contained" onClick={fetchItems}>
          Roll New Items
        </Button>
      </div>
      <section className="item-list">
        {items.length > 0 &&
          items.map((item, i) => {
            return <ItemData key={i} item={item} />;
          })}
      </section>
    </>
  );
}

export default ItemList;
