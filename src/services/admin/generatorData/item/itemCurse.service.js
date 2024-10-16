import axios from "axios";
const BASE_URL = `${process.env.BASE_URL}/items/curses`;

export default class ItemCurse {
  static create = async (ItemCurse) => {
    let res = await axios.post(`${BASE_URL}`, ItemCurse);
    return res.data;
  };

  static update = async (ItemCurse) => {
    let res = await axios.post(`${BASE_URL}/update`, ItemCurse);
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
