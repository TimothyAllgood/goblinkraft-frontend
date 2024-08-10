import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DropdownItem.css";
function DropdownItem({ item }) {
  const navigate = useNavigate();
  return (
    <div
      className={`dropdown-item ${item.image && "with-image"}`}
      onClick={() => navigate(item.link)}
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${item.image})`,
        }}
      ></div>
      <Link to={item.link} data-text={!item.image ? item.title : ""}>
        {item.title}
      </Link>
    </div>
  );
}

export default DropdownItem;
