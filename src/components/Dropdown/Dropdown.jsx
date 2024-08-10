import React from "react";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import "./Dropdown.css";
import Divider from "../Divider/Divider";
import DropdownItem from "./DropdownItem/DropdownItem";

function Dropdown({
  setDropdownOpen,
  toggleDropdown,
  dropdownOpen,
  variant,
  data,
}) {
  return (
    <div
      className={`dropdown ${variant}`}
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <span className="dropbtn" onClick={toggleDropdown}>
        <p data-text={data.title}>{data.title}</p>
        <FontAwesomeIcon icon={faCaretDown} />
      </span>
      <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
        {data.items.map((item, index) => (
          <div
            key={item.title}
            className={`${item.side}-dropdown-item-container dropdown-item-container`}
          >
            <h3>{item.title}</h3>
            <Divider orientation="horizontal" />
            <div className="dropdown-item-container">
              {item.items.map((dropdownItem) => (
                <DropdownItem key={dropdownItem.title} item={dropdownItem} />
              ))}
            </div>
            {index !== data.items.length - 1 && variant === "with-divider" && (
              <Divider orientation="vertical" position="absolute" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
