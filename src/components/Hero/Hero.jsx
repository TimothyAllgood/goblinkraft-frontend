import React from "react";
import hero from "./hero.png";
import "./Hero.css";
// import Button from "../Button/Button";
import GeneratorCard from "../GeneratorCard/GeneratorCard";
import {
  faDiceD20,
  faHandFist,
  faPersonRays,
} from "@fortawesome/free-solid-svg-icons";

function Hero() {
  const generators = [
    {
      name: "NPC Generator",
      url: "/npc-generator",
      icon: faPersonRays,
    },
    {
      name: "Character Generator",
      url: "/character-generator",
      icon: faDiceD20,
    },
    {
      name: "Tavern Generator",
      url: "/tavern-generator",
      icon: faHandFist,
    },
  ];
  return (
    <div className="hero">
      <div className="hero-content">
        {/* <Button /> */}
        <div className="hero-title">
          <h1>Welcome to Goblinkraft</h1>
          <h4>Begin your adventure!</h4>
        </div>
        <div className="generator-grid">
          {generators.map((generator) => (
            <GeneratorCard key={generator.name} generator={generator} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
