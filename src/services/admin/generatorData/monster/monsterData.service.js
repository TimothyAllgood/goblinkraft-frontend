import axios from "axios";
const BASE_URL = "http://localhost:4000/api/v1/monsters/data";

export default class MonsterData {
  static create = async (monster) => {
    let res = await axios.post(`${BASE_URL}/`, monster);
    return res.data;
  };

  static update = async (monster) => {
    let res = await axios.post(`${BASE_URL}/update`, monster);
    return res.data;
  };

  static getMonsters = async () => {
    let res = await axios.get(`${BASE_URL}/`);
    return res.data;
  };

  static getMonster = async (id) => {
    let res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  };

  static deleteMonster = async (id) => {
    let res = await axios.delete(`${BASE_URL}/delete/${id}`);
    return res.data;
  };
}
