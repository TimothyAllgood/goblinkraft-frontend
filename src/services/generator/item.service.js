import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/items`;

export default class ItemService {
  static generateItem = async (config) => {
    let res = await axios.post(`${BASE_URL}/`, config);
    return res.data;
  };
  static generateItems = async (config) => {
    let res = await axios.post(`${BASE_URL}/generate-items`);
    return res.data;
  };
}
