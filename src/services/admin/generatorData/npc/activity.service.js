import axios from "axios";
const BASE_URL = "http://localhost:4000/api/v1/activities";

export default class Activity {
  static create = async (activity) => {
    let res = await axios.post(`${BASE_URL}/`, activity);
    return res.data;
  };

  static update = async (activity) => {
    let res = await axios.post(`${BASE_URL}/update`, activity);
    return res.data;
  };

  static getActivities = async () => {
    let res = await axios.get(`${BASE_URL}/`);
    return res.data;
  };

  static getActivity = async (id) => {
    let res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  };

  static deleteActivity = async (id) => {
    let res = await axios.delete(`${BASE_URL}/delete/${id}`);
    return res.data;
  };
}
