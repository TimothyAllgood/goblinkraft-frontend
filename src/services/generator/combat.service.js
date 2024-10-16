import axios from "axios";
const BASE_URL = `${process.env.BASE_URL}/combat`;

export default class Combat {
  static generateCombatDescription = async (prompt) => {
    let res = await axios.post(`${BASE_URL}/`, { prompt });
    return res.data;
  };
}
