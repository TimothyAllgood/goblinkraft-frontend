import axios from "axios";
const BASE_URL = "http://localhost:4000/api/v1/profiles";

export default class Profile {
  static getProfile = async (id) => {
    let res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  };
}
