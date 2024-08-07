import React from "react";
import "./GeneratorCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function GeneratorCard({ generator, variant }) {
  const navigate = useNavigate();
  return (
    <div
      className={`generator-card ${variant ? variant : ""}`}
      onClick={() => navigate(generator.url)}
    >
      <div className="generator-card-header">
        <h2>{generator.name}</h2>
      </div>
      <div className="generator-card-icon">
        <FontAwesomeIcon icon={generator.icon} />
      </div>
    </div>
  );
}

export default GeneratorCard;
