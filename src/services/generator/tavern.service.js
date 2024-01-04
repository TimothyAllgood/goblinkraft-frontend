import axios from "axios";
const BASE_URL = "http://localhost:4000/api/v1/taverns";

export default class Tavern {
  static generateTavern = async (config) => {
    let res = await axios.post(`${BASE_URL}/`, config);
    return res.data;
  };
  //   static generateItems = async (config) => {
  //     let res = await axios.post(`${BASE_URL}/generate-items`);
  //     return res.data;
  //   };
}
