import axios from "axios";
const BASE_URL = `${process.env.BASE_URL}/monsters`;

export default class Monster {
  static generateMonster = async (filters) => {
    let res = await axios.post(`${BASE_URL}/`, { filters });
    return res.data;
  };
  static generateMonsters = async (config) => {
    let res = await axios.post(`${BASE_URL}/generate-monsters`);
    return res.data;
  };
  static generateMonsterArt = async (monster) => {
    let res = await axios.post(`${BASE_URL}/generate-art`, { monster });
    return res.data;
  };
  static generateBoxedText = async (monster) => {
    let res = await axios.post(`${BASE_URL}/generate-boxed-text`, { monster });
    return res.data;
  };
}
