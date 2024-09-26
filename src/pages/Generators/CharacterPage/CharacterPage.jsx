import React, { useState, useEffect } from "react";
import "./CharacterPage.css";
import Character from "../../../services/generator/character.service";
import Button from "../../../components/Button/Button";
function CharacterPage() {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    generateCharacter();
  }, []);

  const generateCharacter = async () => {
    const character = await Character.generateCharacter();
    console.log(character);
    setCharacter(character);
  };

  return (
    <div className="character-page container">
      <div className="character-details character-section">
        <div className="character-section-header">
          <h2>Character Details</h2>
          <div className="character-section-header-buttons">
            <Button variant="outlined" onClick={generateCharacter}>
              Get New Character
            </Button>
          </div>
        </div>
        <div className="character-section-content">
          {character && (
            <div className="character-card">
              <div className="character-header">
                <p className="subtitle">
                  You are {character.backstory.concept}
                </p>
              </div>
              <div className="character-details">
                <div className="detail-section ">
                  <div className="character-header">
                    <h3>Background</h3>
                  </div>
                  <div className="character-background-card">
                    <p>
                      <strong>Origin:</strong> {character.origin.name}
                    </p>
                    <p>
                      <strong>Culture:</strong> {character.culture.name}
                    </p>
                    <p>
                      <strong>Locale:</strong> {character.locale.name}
                    </p>
                    <p>
                      <strong>Tone:</strong> {character.tone.name}
                    </p>
                    <p>
                      <strong>Alignment:</strong>{" "}
                      {character.backstory.alignment}
                    </p>
                  </div>
                </div>
                <div className="detail-section">
                  <h3>Backstory</h3>

                  <p>{character.backstory.summary}</p>
                </div>
                <div className="character-traits-container">
                  <div className="detail-section character-traits-card">
                    <div className="character-traits-header">
                      <h3>Personal Traits</h3>
                    </div>
                    <div className="character-traits-section">
                      {character.traits.map((trait, index) => (
                        <div key={index}>
                          <p>
                            <strong>{trait.question}:</strong> {trait.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="detail-section character-traits-card">
                    <h3>Class Traits</h3>
                    <div className="character-traits-section">
                      {character.classTraits.map((trait, index) => (
                        <div key={index}>
                          <p>
                            <strong>{trait.question}:</strong> {trait.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="character-story character-section">
        <div className="character-section-header">
          <h2>Character Story</h2>
        </div>
        <div className="character-section-content">
          <p>Once upon a time...</p>
        </div>
      </div>
    </div>
  );
}

export default CharacterPage;
