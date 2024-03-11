import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/items/effects`;

export default class ItemEffect {
  static create = async (itemEffect) => {
    let res = await axios.post(`${BASE_URL}`, itemEffect);
    return res.data;
  };

  static update = async (itemEffect) => {
    let res = await axios.post(`${BASE_URL}/update`, itemEffect);
    return res.data;
  };

  static getItemEffects = async () => {
    let res = await axios.get(`${BASE_URL}/`);
    return res.data;
  };

  static getItemEffect = async (id) => {
    let res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  };

  static deleteItemEffect = async (id) => {
    let res = await axios.delete(`${BASE_URL}/delete/${id}`);
    return res.data;
  };
}
