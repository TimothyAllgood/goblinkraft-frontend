import axios from "axios";
const BASE_URL = `${process.env.BASE_URL}/items/effects`;

export default class ItemEffect {
  static create = async (itemEffect) => {
    let res = await axios.post(`${BASE_URL}`, itemEffect);
    return res.data;
  };

  static update = async (itemEffect) => {
    let res = await axios.post(`${BASE_URL}/update`, itemEffect);
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
