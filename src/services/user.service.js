import axios from "axios";
const BASE_URL = `${process.env.BASE_URL}/users`;

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

  static resetPassword = async (user) => {
    let res = await axios.post(`${BASE_URL}/reset`, user);
    return res.data;
  };

  static generatePasswordReset = async (user) => {
    let res = await axios.post(`${BASE_URL}/reset-password`, user);
    return res.data;
  };

  static getGoogleUrl = async () => {
    console.log("URL: ", process.env.BASE_URL);
    let res = await axios.get(`${BASE_URL}/google`);
    return res.data;
  };

  static getGoogleUserInfo = async (code) => {
    let res = await axios.post(`${BASE_URL}/google/user-info`, { code });
    return res.data;
  };

  static getUser = async () => {
    let res = await axios.get(`${BASE_URL}/user`);
    return res.data;
  };

  static getAdmin = async () => {
    let res = await axios.get(`${BASE_URL}/admin`);
    return res.data;
  };

  static getOpen = async () => {
    let res = await axios.get(`${BASE_URL}/open`);
    return res.data;
  };

  static createSubscription = async (priceId) => {
    let res = await axios.post(`${process.env.BASE_URL}/create-subscription`, {
      priceId: priceId,
    });
    return res.data;
  };
}
