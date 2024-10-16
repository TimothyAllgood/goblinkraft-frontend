import axios from "axios";
const BASE_URL = `https://goblinkraft-backend-production.up.railway.app/api/v1/spells/data`;

export default class SpellData {
  static create = async (spell) => {
    let res = await axios.post(`${BASE_URL}/`, spell);
    return res.data;
  };

  static update = async (spell) => {
    let res = await axios.post(`${BASE_URL}/update`, spell);
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
