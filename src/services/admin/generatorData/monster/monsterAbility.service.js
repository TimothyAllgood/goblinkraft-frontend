import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/monsters/abilities`;

export default class MonsterAbility {
  static create = async (monsterAbility) => {
    let res = await axios.post(`${BASE_URL}/`, monsterAbility);
    return res.data;
  };

  static update = async (monsterAbility) => {
    let res = await axios.post(`${BASE_URL}/update`, monsterAbility);
    return res.data;
  };

  static getAll = async () => {
    let res = await axios.get(`${BASE_URL}/`);
    return res.data;
  };

  static getOne = async (id) => {
    let res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  };

  static delete = async (id) => {
    let res = await axios.delete(`${BASE_URL}/delete/${id}`);
    return res.data;
  };
}
