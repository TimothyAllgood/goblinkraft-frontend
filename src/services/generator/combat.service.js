import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/combat`;

export default class Combat {
  static generateCombatDescription = async (prompt) => {
    let res = await axios.post(`${BASE_URL}/`, { prompt });
    return res.data;
  };
}
