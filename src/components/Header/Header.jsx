import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import {
  faArrowDown,
  faCaretDown,
  faPersonRays,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GeneratorCard from "../GeneratorCard/GeneratorCard";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/">
            <h1>Goblinkraft</h1>
          </Link>
        </div>
        <div className="nav-links">
          <div
            className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="dropbtn" onClick={toggleDropdown}>
              <p>Generators</p>
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
            <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
              <GeneratorCard
                generator={{
                  name: "NPC Generator",
                  url: "/generate/npc",
                  icon: faPersonRays,
                }}
                variant="small"
              />
              <GeneratorCard
                generator={{
                  name: "Character Generator",
                  url: "/generate/character",
                  icon: faPersonRays,
                }}
                variant="small"
              />
              <GeneratorCard
                generator={{
                  name: "Killing Blow Generator",
                  url: "/generate/killing-blow",
                  icon: faPersonRays,
                }}
                variant="small"
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
