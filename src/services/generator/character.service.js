import axios from "axios";
const BASE_URL = `${process.env.BASE_URL}/characters`;

export default class Character {
  static generateCharacter = async (filters) => {
    let res = await axios.post(`${BASE_URL}/`);
    return res.data;
  };

  static generateCharacterStory = async (character) => {
    let res = await axios.post(`${BASE_URL}/story`, { character });
    return res.data;
  };
}
