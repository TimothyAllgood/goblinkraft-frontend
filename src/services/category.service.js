import axios from "axios";
const BASE_URL = `${
  import.meta.env.DEV ? import.meta.env.VITE_BASE_URL : process.env.BASE_URL
}/categories`;

export default class Category {
  static create = async (category) => {
    let res = await axios.post(`${BASE_URL}/create`, category);
    return res.data;
  };

  static getCategories = async () => {
    let res = await axios.get(`${BASE_URL}/`);
    return res.data;
  };

  static getCategory = async (id) => {
    let res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  };

  static deleteCategory = async (id) => {
    let res = await axios.delete(`${BASE_URL}/delete/${id}`);
    return res.data;
  };
}
