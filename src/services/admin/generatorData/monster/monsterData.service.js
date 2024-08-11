import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/monsters/data`;

export default class MonsterData {
  static create = async (monster) => {
    let res = await axios.post(`${BASE_URL}/`, monster);
    return res.data;
  };

  static update = async (monster) => {
    let res = await axios.post(`${BASE_URL}/update`, monster);
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

  static getAutocomplete = async (search) => {
    let res = await axios.get(`${BASE_URL}/autocomplete/${search}`);
    return res.data;
  };

  static delete = async (id) => {
    let res = await axios.delete(`${BASE_URL}/delete/${id}`);
    return res.data;
  };
}
