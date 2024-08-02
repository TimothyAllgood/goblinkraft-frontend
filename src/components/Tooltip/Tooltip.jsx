import React from "react";
import "./Tooltip.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function Tooltip({ text }) {
  return (
    <div className="tooltip">
      <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
      <div className="tooltip-text">{text}</div>
    </div>
  );
}

export default Tooltip;
