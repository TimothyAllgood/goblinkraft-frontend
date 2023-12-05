import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./DropdownMenu.css";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DropdownMenu = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-menu">
      <div className="dropdown-menu-header" onClick={toggleDropdown}>
        <span>{title}</span>
        {isOpen ? (
          <FontAwesomeIcon icon={faArrowUp} />
        ) : (
          <FontAwesomeIcon icon={faArrowDown} />
        )}
      </div>
      {isOpen && (
        <ul className="dropdown-menu-items">
          {items.map((item, index) => (
            <li key={index}>
              <NavLink to={item.path}>{item.label}</NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
