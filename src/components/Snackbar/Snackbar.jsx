import React, { useState, useEffect } from "react";
import "./Snackbar.css";

const Snackbar = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="snackbar">
      {message}
      <button
        onClick={() => {
          setVisible(false);
          onClose();
        }}
      >
        Close
      </button>
    </div>
  );
};

export default Snackbar;
