import React, { useState, useEffect } from "react";
import "./CharacterPage.css";
import Character from "../../../services/generator/character.service";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import Markdown from "../../../components/Markdown/Markdown";
function CharacterPage() {
  const [character, setCharacter] = useState(null);
  // const [story, setStory] = useState(null);
  // const [generatingStory, setGeneratingStory] = useState(false);
  // const [showStory, setShowStory] = useState(false);

  useEffect(() => {
    generateCharacter();
  }, []);

  // useEffect(() => {
  //   setStory(null);
  //   setGeneratingStory(false);
  // }, [character]);

  const generateCharacter = async () => {
    const character = await Character.generateCharacter();
    setCharacter(character);
  };

  // const generateCharacterStory = async () => {
  //   setGeneratingStory(true);
  //   const res = await Character.generateCharacterStory(character);
  //   setStory(res.story);
  //   setGeneratingStory(false);
  //   setShowStory(true);
  // };

  return (
    <div className="character-page container">
      <div className="character-details character-section">
        <div className="character-section-header">
          <h2>Character Details</h2>
          <div className="character-section-header-buttons">
            <Button variant="outlined" onClick={generateCharacter}>
              Get New Character
            </Button>
            {/* <Button
              variant="outlined"
              onClick={generateCharacterStory}
              disabled={generatingStory}
            >
              {generatingStory ? "Generating..." : "Get New Story"}
            </Button>
            {story && (
              <Button variant="outlined" onClick={() => setShowStory(true)}>
                View Full Story
              </Button>
            )} */}
          </div>
        </div>
        <div className="character-section-content card-bg">
          {character && (
            <div className="character-card ">
              <div className="character-header">
                <p className="subtitle large-p">
                  You are {character.backstory.concept.replace(/\.{2}$/, ".")}
                </p>
              </div>
              <div className="character-details ">
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
      {/* <div className="character-story character-section">
        <div className="character-section-header">
          <h2>Character Story</h2>
        </div>
        <div className="character-section-content">
          <p>Once upon a time...</p>
        </div>
      </div>
      {showStory && (
        <Modal isOpen={showStory} onClose={() => setShowStory(false)}>
          <Markdown content={story} />
        </Modal>
      )} */}
    </div>
  );
}

export default CharacterPage;
