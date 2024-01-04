import axios from "axios";
const BASE_URL = "http://localhost:4000/api/v1/monsters/abilities";

export default class MonsterAbility {
  static create = async (monsterAbility) => {
    let res = await axios.post(`${BASE_URL}/`, monsterAbility);
    return res.data;
  };

  static update = async (monsterAbility) => {
    let res = await axios.post(`${BASE_URL}/update`, monsterAbility);
    return res.data;
  };

  static getMonsterAbilities = async () => {
    let res = await axios.get(`${BASE_URL}/`);
    return res.data;
  };

  static getMonsterAbility = async (id) => {
    let res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  };

  static deleteMonsterAbility = async (id) => {
    let res = await axios.delete(`${BASE_URL}/delete/${id}`);
    return res.data;
  };
}
