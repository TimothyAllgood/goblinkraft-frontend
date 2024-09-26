import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/tavern/menu-items`;

export default class MenuItem {
  static create = async (menuItem) => {
    let res = await axios.post(`${BASE_URL}/`, menuItem);
    return res.data;
  };

  static update = async (menuItem) => {
    let res = await axios.post(`${BASE_URL}/update`, menuItem);
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
