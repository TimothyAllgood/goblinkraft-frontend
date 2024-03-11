import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/tavern/rumors`;

export default class TavernRumor {
  static create = async (tavernRumor) => {
    let res = await axios.post(`${BASE_URL}/`, tavernRumor);
    return res.data;
  };

  static update = async (tavernRumor) => {
    let res = await axios.post(`${BASE_URL}/update`, tavernRumor);
    return res.data;
  };

  static getTavernRumors = async () => {
    let res = await axios.get(`${BASE_URL}/`);
    return res.data;
  };

  static getTavernRumor = async (id) => {
    let res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  };

  static deleteTavernRumor = async (id) => {
    let res = await axios.delete(`${BASE_URL}/delete/${id}`);
    return res.data;
  };
}
