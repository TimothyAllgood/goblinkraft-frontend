import axios from "axios";
const BASE_URL = `https://goblinkraft-backend-production.up.railway.app/api/v1/reports`;

export default class Report {
  static getAll = async (type) => {
    let res = await axios.get(`${BASE_URL}${type ? `?type=${type}` : ""}`);
    return res.data;
  };
}
