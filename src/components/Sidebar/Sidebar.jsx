import React from "react";
import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import "./Sidebar.css";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  let items = [
    {
      path: "/",
      label: "Home",
    },
  ];
  return (
    <>
      <header className={`${sidebarOpen ? "open" : ""}`}>
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
            <NavLink to="/open">Unprotected Route</NavLink>
          </li>
          <li>
            <NavLink to="/user">User Protected Route</NavLink>
          </li>
          <li>
            <NavLink to="/admin">Admin Protected Route</NavLink>
          </li>
          <DropdownMenu title={"Dropdown"} items={items} />
          <li>
            <NavLink to="/dashboard">Account</NavLink>
          </li>
        </ul>
      </header>
      <div
        className={`toggle-menu ${sidebarOpen ? "move" : ""}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "←" : "→"}
      </div>
    </>
  );
}

export default Sidebar;
