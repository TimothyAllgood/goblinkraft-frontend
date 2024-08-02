import React from "react";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import SignupButton from "../SignupButton/SignupButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, NavLink } from "react-router-dom";
import NavMenu from "../NavMenu/NavMenu";
import "./Sidebar.css";
import { faBars, faHandFist, faPersonRays } from "@fortawesome/free-solid-svg-icons";
import Divider from "../Divider/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { user, isAuthenticated } = useAuth0();

  const generators = [
    {
      path: "/generate/npc",
      label: "NPC",
      icon: faPersonRays,
    },
    // {
    //   path: "/generate/item",
    //   label: "Item Generator",
    // },
    // {
    //   path: "/generate/character",
    //   label: "Character",
    //   icon: faPersonRays,
    // },
    // {
    //   path: "/generate/plot-hook",
    //   label: "Plot Hook Generator",
    // },
    // {
    //   path: "/generate/tavern",
    //   label: "Tavern Generator",
    // },
    // {
    //   path: "/generate/monster",
    //   label: "Monster Generator",
    // },
    // {
    //   path: "/generate/trap",
    //   label: "Trap Generator",
    // },
    {
      path: "/generate/combat-description",
      label: "Combat Description",
      icon: faHandFist,
    },
    // {
    //   path: "/generate/town",
    //   label: "Town Generator",
    // },
  ];

  return (
    <>
      <div
        className={`sidebar-toggle ${sidebarOpen ? "toggled" : ""}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
      <header className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <nav>
          <div className="sidebar-header">
            <Link to="/">
              <h1>Goblinkraft</h1>
            </Link>
          </div>
          <Divider color="var(--divider-color)" />
          <NavMenu items={generators} />
          <div className="sidebar-buttons">
            {isAuthenticated ? (
              <>
                {/* <p>{user.username ? user.username : user.name}</p>
              <img src={user.picture} alt={user.name} /> */}
                {/* <LogoutButton /> */}
              </>
            ) : (
              <>
                {/* <LoginButton />
              <SignupButton /> */}
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Sidebar;
