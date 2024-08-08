import axios from "axios";
const BASE_URL = `https://goblinkraft-backend-production.up.railway.app/api/v1/monsters`;

export default class Monster {
  static generateMonster = async (filters) => {
    let res = await axios.post(`${BASE_URL}/`, { filters });
    return res.data;
  };
  static generateMonsters = async (config) => {
    let res = await axios.post(`${BASE_URL}/generate-monsters`);
    return res.data;
  };
}
