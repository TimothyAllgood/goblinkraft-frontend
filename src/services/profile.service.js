import axios from "axios";
const BASE_URL = `https://goblinkraft-backend-production.up.railway.app/api/v1/profile`;

export default class Profile {
  static getProfile = async (id) => {
    let res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  };

  static getUsername = async (userId) => {
    let res = await axios.get(`${BASE_URL}/username/${userId}`);
    return res.data;
  };

  static updateProfile = async (id, profile) => {
    let res = await axios.post(`${BASE_URL}/${id}`, profile);
    return res.data;
  };
}
