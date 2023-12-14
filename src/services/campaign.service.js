import axios from "axios";
const BASE_URL = "http://localhost:4000/api/v1/campaigns";

export default class Campaign {
  static create = async (campaign) => {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    let res = await axios.post(`${BASE_URL}/create`, campaign, { config });
    return res.data;
  };

  static getCampaigns = async () => {
    let res = await axios.get(`${BASE_URL}`);
    return res.data;
  };

  static getCampaign = async (id) => {
    let res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  };

  static updateImage = async (campaign) => {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    let res = await axios.post(`${BASE_URL}/update-image`, campaign, {
      config,
    });
    return res.data;
  };

  static deleteCampaign = async (id) => {
    let res = await axios.delete(`${BASE_URL}/delete/${id}`);
    return res.data;
  };
}
