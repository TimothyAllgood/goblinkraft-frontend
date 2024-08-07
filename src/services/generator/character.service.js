import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/characters`;

export default class Character {
  static generateCharacter = async (filters) => {
    let res = await axios.post(`${BASE_URL}/`);
    return res.data;
  };
}
