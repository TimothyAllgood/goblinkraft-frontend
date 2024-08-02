import axios from "axios";
const BASE_URL = `https://goblinkraft-backend-production.up.railway.app/api/v1/categories`;

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
