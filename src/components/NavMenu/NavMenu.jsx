import React from "react";
import { NavLink } from "react-router-dom";
import "./NavMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavMenu({ items }) {
  return (
    <ul className="nav-menu">
      {items.map((item) => (
        <li className="nav-item" key={item.path}>
          <NavLink to={item.path}>
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default NavMenu;
