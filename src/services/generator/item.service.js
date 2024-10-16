import axios from "axios";
const BASE_URL = `${process.env.BASE_URL}/items`;

export default class ItemService {
  static generateItem = async (config) => {
    let res = await axios.post(`${BASE_URL}/`, config);
    return res.data;
  };
  static generateItems = async (config) => {
    let res = await axios.post(`${BASE_URL}/generate-items`);
    return res.data;
  };
  static generateItemLore = async (item) => {
    let res = await axios.post(`${BASE_URL}/generate-item-lore`, item);
    return res.data;
  };
  static generateItemArt = async (item) => {
    let res = await axios.post(`${BASE_URL}/generate-item-art`, item);
    return res.data;
  };
  static generateItemDescription = async (item) => {
    let res = await axios.post(`${BASE_URL}/generate-item-description`, item);
    return res.data;
  };
}
