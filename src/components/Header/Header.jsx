import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import {
  faArrowDown,
  faCaretDown,
  faPersonRays,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GeneratorCard from "../GeneratorCard/GeneratorCard";
import SwordDivider from "../SwordDivider/SwordDivider";
import Divider from "../Divider/Divider";

function Header() {
  const navigate = useNavigate();
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
          <div
            className="dropdown with-divider"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="dropbtn" onClick={toggleDropdown}>
              <p>Generators</p>
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
            <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
              <div className="popular-generators">
                <h2>Popular Generators</h2>
                <div
                  className="generator-container"
                  onClick={() => navigate("/generate/npc")}
                >
                  <div className="item popular-generator">
                    <div
                      className="background-image"
                      style={{
                        backgroundImage:
                          "url(https://cdn.openart.ai/stable_diffusion/dc13ed8cc698f1c1ffbe34311d4107b23d7b910f_2000x2000.webp)",
                      }}
                    ></div>
                    <Link to="/generate/npc">NPC Generator</Link>
                  </div>
                  <div
                    className="item popular-generator"
                    onClick={() => navigate("/generate/killing-blow")}
                  >
                    <div
                      className="background-image"
                      style={{
                        backgroundImage:
                          "url(https://i.redd.it/kgtoswmnlhy61.jpg)",
                      }}
                    ></div>
                    <Link to="/generate/killing-blow">
                      Killing Blow Generator
                    </Link>
                  </div>
                  <div
                    className="item popular-generator"
                    onClick={() => navigate("/generate/character")}
                  >
                    <div
                      className="background-image"
                      style={{
                        backgroundImage:
                          "url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2e2ca105-22d3-44e7-ad36-b1ef4ac17cf7/ddzotom-2891398a-3025-43ba-926c-0c664ec66399.jpg/v1/fill/w_1024,h_640,q_75,strp/commission__dnd_group_by_innervalue_ddzotom-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjQwIiwicGF0aCI6IlwvZlwvMmUyY2ExMDUtMjJkMy00NGU3LWFkMzYtYjFlZjRhYzE3Y2Y3XC9kZHpvdG9tLTI4OTEzOThhLTMwMjUtNDNiYS05MjZjLTBjNjY0ZWM2NjM5OS5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19._Shk4PVPQ36q6P5SJKjWUh0S-X-XSFfCEJL0uRz5P58)",
                      }}
                    ></div>
                    <Link to="/generate/character">Character Generator</Link>
                  </div>
                </div>
              </div>
              <Divider orientation="vertical" color="white" />
              <div className="other-generators">
                <h2>Other Generators</h2>
                <div className="other-generators-container">
                  <Link to="/generate/weapon">Monster Generator</Link>
                  <Link to="/generate/weapon">Item Generator</Link>
                  <Link to="/generate/weapon">Tavern Generator</Link>
                  <Link to="/generate/weapon">Plot Generator</Link>
                </div>
              </div>
              {/* <SwordDivider /> */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
