import React from "react";

function AutocompleteOption({ option, setValue }) {
  return (
    <div className="option">
      {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
    </div>
  );
}

export default AutocompleteOption;
