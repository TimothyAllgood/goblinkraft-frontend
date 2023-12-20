import axios from "axios";
const BASE_URL = "http://localhost:4000/api/v1/items/curses";

export default class ItemCurse {
  static create = async (ItemCurse) => {
    let res = await axios.post(`${BASE_URL}`, ItemCurse);
    return res.data;
  };

  static update = async (ItemCurse) => {
    let res = await axios.post(`${BASE_URL}/update`, ItemCurse);
    return res.data;
  };

  static getItemCurses = async () => {
    let res = await axios.get(`${BASE_URL}/`);
    return res.data;
  };

  static getItemCurse = async (id) => {
    let res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  };

  static deleteItemCurse = async (id) => {
    let res = await axios.delete(`${BASE_URL}/delete/${id}`);
    return res.data;
  };
}
