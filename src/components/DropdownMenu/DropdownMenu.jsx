import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./DropdownMenu.css";
import { Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const DropdownMenu = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  document.querySelector("body").addEventListener("click", (e) => {
    if (!e.target.classList.contains("dropdown-title")) {
      setIsOpen(false);
    }
  });

  return (
    <div className="dropdown-menu">
      <div className="dropdown-menu-header" onClick={toggleDropdown}>
        <span className="animate-link dropdown-title">{title}</span>
        <ArrowDropDownIcon
          sx={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "all ease .3s",
          }}
        />
      </div>
      {isOpen && (
        <ul className="dropdown-menu-items">
          <Box
            display="flex"
            flexDirection="column"
            gap="1rem"
            className="dropdown-flex"
            sx={{
              position: "absolute",
              top: 50,
              left: 0,
              width: "max-content",
              p: "1rem",
              backgroundColor: "var(--nav-bg)",
              border: "1px solid rgba(0, 0, 0, 0.12)",
            }}
          >
            {items.map((item, index) => (
              <li key={index}>
                <NavLink
                  className="dropdown-item"
                  onClick={toggleDropdown}
                  to={item.path}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </Box>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
