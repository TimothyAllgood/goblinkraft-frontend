import axios from "axios";
const BASE_URL = `https://goblinkraft-backend-production.up.railway.app/api/v1/characters`;

export default class Character {
  static generateCharacter = async (filters) => {
    let res = await axios.post(`${BASE_URL}/`);
    return res.data;
  };
}
