import React, { useEffect, useState } from "react";
import Character from "../../../services/generator/character.service";
import { Box, Button, Typography } from "@mui/material";
import "./CharacterPage.css";

function CharacterPage() {
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCharacter();
  }, []);

  const fetchCharacter = async () => {
    setLoading(true);
    let res = await Character.generateCharacter();
    setCharacter(res);
    setLoading(false);
  };

  // if (loading) return "Loading";

  return (
    <>
      <div className="button-container">
        <Button variant="contained" onClick={fetchCharacter}>
          Roll New Character
        </Button>
      </div>
      <section className="character-page">
        <div className="character">
          <Typography variant="h5">
            You are {character?.backstory?.concept}
          </Typography>
          <Typography>{character?.backstory?.summary}</Typography>
        </div>
        <div className="traits">
          <Box>
            {character?.traits?.map((trait) => {
              return (
                <Box>
                  <Typography variant="h6" className="bold">
                    {trait.question}
                  </Typography>
                  <Typography>{trait.answer}</Typography>
                </Box>
              );
            })}
          </Box>
          <Box>
            {character?.classTraits?.map((trait) => {
              return (
                <Box>
                  <Typography variant="h6" className="bold">
                    {trait.question}
                  </Typography>
                  <Typography>{trait.answer}</Typography>
                </Box>
              );
            })}
          </Box>
        </div>
      </section>
    </>
  );
}

export default CharacterPage;
