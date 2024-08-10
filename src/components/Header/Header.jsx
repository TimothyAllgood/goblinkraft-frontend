import React, { useState } from "react";
import { Link } from "react-router-dom";
import { generatorMenuItems } from "../../data/menus/generator.data";
import "./Header.css";

import Dropdown from "../Dropdown/Dropdown";
import Divider from "../Divider/Divider";
import LoginButton from "../LoginButton/LoginButton";
import SignupButton from "../SignupButton/SignupButton";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
          <Link to="/" data-text="Looking For Group">
            Looking For Group
          </Link>
          <div className="vertical-divider" />
          <div className="user-buttons">
            <LoginButton />
            <SignupButton />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
