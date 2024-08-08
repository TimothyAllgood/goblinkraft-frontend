import axios from "axios";
const BASE_URL = `https://goblinkraft-backend-production.up.railway.app/api/v1/taverns`;

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
