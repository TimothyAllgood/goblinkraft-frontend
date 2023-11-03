import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/users";

export default class User {
  static register = async (user) => {
    let res = await axios.post(`${BASE_URL}/register`, user);
    return res.data;
  };

  static login = async (user) => {
    let res = await axios.post(`${BASE_URL}/login`, user);
    return res.data;
  };

  static authorize = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/authorize`);
      return res.data;
    } catch (error) {
      return error;
    }
  };

  static getProfile = async (id) => {
    try {
      let auth = await this.authorize();
      if (auth.user.id === parseInt(id)) {
        let res = await axios.get(`${BASE_URL}/${id}`);
        return res.data;
      }
    } catch (error) {
      return error;
    }
  };

  static generateVerification = async (id) => {
    let res = await axios.post(`${BASE_URL}/verify-user `, id);
    return res.data;
  };

  static verifyUser = async (id) => {
    let res = await axios.post(`${BASE_URL}/verify/${id}`);
    return res.data;
  };
}
