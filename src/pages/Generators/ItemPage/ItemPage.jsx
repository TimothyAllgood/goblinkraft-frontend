import React, { useEffect, useState } from "react";
import ItemService from "../../../services/generator/item.service";
import Item from "./Item/Item";
import "./ItemPage.css";
import Button from "../../../components/Button/Button";

function ItemPage() {
  const [items, setItems] = useState({});
  const [generating, setGenerating] = useState(false);
  const [otherItemsGenerating, setOtherItemsGenerating] = useState(false);
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setGenerating(true);
      let res = await ItemService.generateItems();
      setItems(res.items);
      setGenerating(false);
    } catch (error) {
      console.log(error);
    }
    console.log(res.items);
  };
  return (
    <div className="item-page container">
      <div className="item-container-header">
        <Button variant="dark" disabled={generating} onClick={fetchItems}>
          {generating ? "Generating..." : "Generate Items"}
        </Button>
      </div>
      <div className="item-container">
        {items.length > 0 &&
          items.map((item, i) => {
            return (
              <Item
                key={i}
                item={item}
                otherItemsGenerating={otherItemsGenerating}
                setOtherItemsGenerating={setOtherItemsGenerating}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ItemPage;
