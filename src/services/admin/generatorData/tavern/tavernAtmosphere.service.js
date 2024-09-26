import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/tavern/atmospheres`;

export default class TavernAtmosphere {
  static create = async (tavernAtmosphere) => {
    let res = await axios.post(`${BASE_URL}/`, tavernAtmosphere);
    return res.data;
  };

  static update = async (tavernAtmosphere) => {
    let res = await axios.post(`${BASE_URL}/update`, tavernAtmosphere);
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
