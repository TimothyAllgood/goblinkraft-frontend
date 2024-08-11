import React from "react";
import "./FancyButton.css";
function FancyButton({ children, onClick, disabled }) {
  return (
    <button
      className="button outlined no-angled-corners"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default FancyButton;
