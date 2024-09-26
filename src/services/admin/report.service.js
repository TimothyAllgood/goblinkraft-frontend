import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/reports`;

export default class Report {
  static getAll = async (type) => {
    let res = await axios.get(`${BASE_URL}${type ? `?type=${type}` : ""}`);
    return res.data;
  };
}
