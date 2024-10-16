import axios from "axios";
const BASE_URL = `https://goblinkraft-backend-production.up.railway.app/api/v1/tavern/events`;

export default class TavernEvent {
  static create = async (tavernEvent) => {
    let res = await axios.post(`${BASE_URL}/`, tavernEvent);
    return res.data;
  };

  static update = async (tavernEvent) => {
    let res = await axios.post(`${BASE_URL}/update`, tavernEvent);
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
