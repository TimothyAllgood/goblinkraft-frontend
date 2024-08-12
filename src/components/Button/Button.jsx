import React from "react";
import "./Button.css";

function Button({ onClick, children, variant = "primary", disabled = false }) {
  return (
    <div
      className={`button ${variant} ${disabled ? "disabled" : ""}`}
      onClick={!disabled ? onClick : null}
      disabled={disabled}
    >
      {children}
    </div>
  );
}

export default Button;
