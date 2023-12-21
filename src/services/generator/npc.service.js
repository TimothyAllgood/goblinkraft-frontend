import axios from "axios";
const BASE_URL = "http://localhost:4000/api/v1/npcs";

export default class Npc {
  static generateNpcs = async (id) => {
    let res = await axios.get(`${BASE_URL}/generate-npcs`);
    return res.data;
  };
}
