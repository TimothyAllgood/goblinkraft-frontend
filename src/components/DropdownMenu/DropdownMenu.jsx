import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./DropdownMenu.css";

const DropdownMenu = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-menu">
      <div className="dropdown-menu-header" onClick={toggleDropdown}>
        <span>{title}</span>
        {isOpen ? "↑" : "↓"}
      </div>
      {isOpen && (
        <ul className="dropdown-menu-items">
          {items.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
