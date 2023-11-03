import React from "react";
import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import "./Sidebar.css";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
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
