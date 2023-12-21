import axios from "axios";
const BASE_URL = "http://localhost:4000/api/v1/plothooks";

export default class PlotHook {
  static generatePlotHook = async (config) => {
    let res = await axios.post(`${BASE_URL}/`, config);
    return res.data;
  };
  static generatePlotHooks = async (config) => {
    let res = await axios.post(`${BASE_URL}/generate-plothooks`, config);
    return res.data;
  };
}
