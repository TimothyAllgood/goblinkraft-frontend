import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { generatorMenuItems } from "../../data/menus/generator.data";
import "./Header.css";

import Dropdown from "../Dropdown/Dropdown";
import LoginButton from "../LoginButton/LoginButton";
import SignupButton from "../SignupButton/SignupButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useLocalStorage } from "@uidotdev/usehooks";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isLoading, isAuthenticated } = useAuth0();
  const [username] = useLocalStorage("username");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header>
      <nav className="desktop-nav">
        <div className="logo">
          <Link to="/">
            <h1>Goblinkraft</h1>
          </Link>
        </div>
        <div className="nav-links">
          <Dropdown
            setDropdownOpen={setDropdownOpen}
            toggleDropdown={toggleDropdown}
            dropdownOpen={dropdownOpen}
            variant="with-divider"
            data={generatorMenuItems}
          />
          {/* <Link to="/" data-text="Looking For Group">
            Looking For Group
          </Link> */}
          <div className="vertical-divider" />
          <div className="user-buttons">
            {isLoading ? (
              <p>Loading...</p>
            ) : isAuthenticated ? (
              <>
                <p>{username}</p>
                <LogoutButton />
              </>
            ) : (
              <>
                <LoginButton />
                <SignupButton />
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
