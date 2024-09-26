import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/backstories/data`;

export default class Backstory {
  static create = async (backstory) => {
    let res = await axios.post(`${BASE_URL}`, backstory);
    return res.data;
  };

  static update = async (backstory) => {
    let res = await axios.post(`${BASE_URL}/update`, backstory);
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
