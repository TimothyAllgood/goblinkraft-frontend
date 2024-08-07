import React from "react";
import "./Button.css";
function Button({ children, onClick, disabled }) {
  return (
    <button
      className="button outlined no-angled-corners"
      onClick={onClick}
      disabled={disabled}
    >
      Button
    </button>
  );
}

export default Button;
