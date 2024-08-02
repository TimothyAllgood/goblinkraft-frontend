import axios from "axios";
const BASE_URL = `https://goblinkraft-backend-production.up.railway.app/api/v1/tavern/features`;

export default class TavernFeature {
  static create = async (tavernFeature) => {
    let res = await axios.post(`${BASE_URL}/`, tavernFeature);
    return res.data;
  };

  static update = async (tavernFeature) => {
    let res = await axios.post(`${BASE_URL}/update`, tavernFeature);
    return res.data;
  };

  static getTavernFeatures = async () => {
    let res = await axios.get(`${BASE_URL}/`);
    return res.data;
  };

  static getTavernFeature = async (id) => {
    let res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  };

  static deleteTavernFeature = async (id) => {
    let res = await axios.delete(`${BASE_URL}/delete/${id}`);
    return res.data;
  };
}
