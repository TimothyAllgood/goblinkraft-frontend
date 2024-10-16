import axios from "axios";
const BASE_URL = `https://goblinkraft-backend-production.up.railway.app/api/v1/tavern/rumors`;

export default class TavernRumor {
  static create = async (tavernRumor) => {
    let res = await axios.post(`${BASE_URL}/`, tavernRumor);
    return res.data;
  };

  static update = async (tavernRumor) => {
    let res = await axios.post(`${BASE_URL}/update`, tavernRumor);
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
