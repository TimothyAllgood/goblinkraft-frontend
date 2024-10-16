import axios from "axios";
const BASE_URL = `https://goblinkraft-backend-production.up.railway.app/api/v1/plothooks`;

export default class PlotHook {
  static generatePlotHook = async (config) => {
    let res = await axios.post(`${BASE_URL}/`, config);
    return res.data;
  };
  static generatePlotHooks = async (config) => {
    let res = await axios.post(`${BASE_URL}/generate-plothooks`, config);
    return res.data;
  };
  static generateAdventure = async (plothook) => {
    let res = await axios.post(`${BASE_URL}/generate-adventure`, plothook);
    return res.data;
  };
}
