import axios from "axios";
const BASE_URL = `https://goblinkraft-backend-production.up.railway.app/api/v1/characterTraits/data`;

export default class CharacterTrait {
  static create = async (characterTrait) => {
    let res = await axios.post(`${BASE_URL}`, characterTrait);
    return res.data;
  };

  static update = async (characterTrait) => {
    let res = await axios.post(`${BASE_URL}/update`, characterTrait);
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
