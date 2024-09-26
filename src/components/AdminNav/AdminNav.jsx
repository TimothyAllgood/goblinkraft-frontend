import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./AdminNav.css";
import { Link } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
function AdminNav() {
  const { isAuthenticated } = useAuth0();
  const [role] = useLocalStorage("role");
  const isAdmin = isAuthenticated && role === "ADMIN";
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };
  return (
    <>
      {isAdmin && (
        <div className="admin-nav">
          <button onClick={toggleNav} className="admin-nav-toggle">
            {isNavVisible ? "Hide Admin Menu" : "Show Admin Menu"}
          </button>

          <ul className={`admin-nav-list ${isNavVisible ? "visible" : ""}`}>
            <li className="admin-nav-item">
              <Link onClick={toggleNav} to="/admin/npc">
                NPC
              </Link>
            </li>
            <li className="admin-nav-item">
              <Link onClick={toggleNav} to="/admin/monster">
                Monster
              </Link>
            </li>
            <li className="admin-nav-item">
              <Link onClick={toggleNav} to="/admin/tavern">
                Tavern
              </Link>
            </li>
            <li className="admin-nav-item">
              <Link onClick={toggleNav} to="/admin/item">
                Item
              </Link>
            </li>
            <li className="admin-nav-item">
              <Link onClick={toggleNav} to="/admin/plot-hook">
                Plot Hook
              </Link>
            </li>
            <li className="admin-nav-item">
              <Link onClick={toggleNav} to="/admin/character">
                Character
              </Link>
            </li>
            <li className="admin-nav-item">
              <Link onClick={toggleNav} to="/admin/class">
                Class
              </Link>
            </li>
            <li className="admin-nav-item">
              <Link onClick={toggleNav} to="/admin/trait">
                Character Traits
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default AdminNav;
