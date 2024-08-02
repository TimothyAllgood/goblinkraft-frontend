import axios from "axios";
const BASE_URL = `https://goblinkraft-backend-production.up.railway.app/api/v1/combat`;

export default class Combat {
  static generateCombatDescription = async (prompt) => {
    let res = await axios.post(`${BASE_URL}/`, { prompt });
    return res.data;
  };
}
