import React from "react";
import "./Button.css";

function Button({ onClick, children, variant = "primary" }) {
  return (
    <div className={`button ${variant}`} onClick={onClick}>
      {children}
    </div>
  );
}

export default Button;
