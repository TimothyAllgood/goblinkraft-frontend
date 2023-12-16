import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import "./Tooltip.css";

function Tooltip({ content }) {
  return (
    <div class="tooltip">
      <FontAwesomeIcon icon={faInfo} />
      <span class="tooltiptext">{content}</span>
    </div>
  );
}

export default Tooltip;
