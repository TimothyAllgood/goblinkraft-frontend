import axios from "axios";
const BASE_URL = `${process.env.BASE_URL}/plothooks`;

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
