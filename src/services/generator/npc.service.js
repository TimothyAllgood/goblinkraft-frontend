import axios from "axios";
const BASE_URL = `${process.env.BASE_URL}/npcs`;

export default class Npc {
  static generateNpcs = async (id) => {
    let res = await axios.post(`${BASE_URL}/generate-npcs`);
    return res.data;
  };

  static generateAINpcs = async () => {
    let res = await axios.post(`${BASE_URL}/generate-ai-npcs`);
    return res.data;
  };

  static generateArt = async (npc) => {
    let res = await axios.post(`${BASE_URL}/generate-npc-art`, npc);
    return res.data;
  };

  static generateQuest = async (npc) => {
    let res = await axios.post(`${BASE_URL}/generate-npc-quest`, npc);
    return res.data;
  };
}
