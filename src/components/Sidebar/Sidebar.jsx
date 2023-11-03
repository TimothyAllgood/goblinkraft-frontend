import React from "react";
import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import "./Sidebar.css";

function Sidebar() {
  return (
    <header>
      <div className="logo">
        <ReactSVG className="logo-svg" src="./src/assets/logo.svg" />
        <h1>Goblinkraft</h1>
      </div>
      <span className="divider"></span>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">World</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Campaign</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Generator</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Account</NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Sidebar;
