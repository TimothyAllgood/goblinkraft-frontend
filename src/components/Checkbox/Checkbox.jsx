import React from "react";
import "./Checkbox.css";

function Checkbox({ label, checked, onChange }) {
  return (
    <label class="cyberpunk-checkbox-label">
      {label}
      <input
        type="checkbox"
        class="cyberpunk-checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}

export default Checkbox;
