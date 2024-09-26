import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/classTraits/data`;

export default class ClassTrait {
  static create = async (classTrait) => {
    let res = await axios.post(`${BASE_URL}`, classTrait);
    return res.data;
  };

  static update = async (classTrait) => {
    let res = await axios.post(`${BASE_URL}/update`, classTrait);
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

  static getByClass = async (characterClass) => {
    let res = await axios.get(`${BASE_URL}/class/${characterClass}`);
    return res.data;
  };

  static delete = async (id) => {
    let res = await axios.delete(`${BASE_URL}/delete/${id}`);
    return res.data;
  };
}
