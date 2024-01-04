import axios from "axios";
const BASE_URL = "http://localhost:4000/api/v1/characters";

export default class Character {
  static generateCharacter = async (filters) => {
    let res = await axios.post(`${BASE_URL}/`);
    return res.data;
  };
}
