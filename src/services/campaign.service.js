import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/campaigns`;

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

  static getNPC = async (id) => {
    let res = await axios.get(`${BASE_URL}/npcs/get/${id}`);
    return res.data;
  };

  static getNPCs = async (id) => {
    let res = await axios.get(`${BASE_URL}/npcs/getall/${id}`);
    return res.data;
  };

  static deleteNPC = async (id) => {
    let res = await axios.delete(`${BASE_URL}/npcs/delete/${id}`);
    return res.data;
  };

  static upsertNPC = async (id, npc) => {
    let res = await axios.post(`${BASE_URL}/npcs/upsert`, {
      campaignId: id,
      npc,
    });
    return res.data;
  };

  static updateNPCImage = async (npc) => {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    let res = await axios.post(`${BASE_URL}/npcs/update-image`, npc, {
      config,
    });
    return res.data;
  };

  static getSettlement = async (id) => {
    let res = await axios.get(`${BASE_URL}/settlements/get/${id}`);
    return res.data;
  };

  static getSettlements = async (id) => {
    let res = await axios.get(`${BASE_URL}/settlements/getall/${id}`);
    return res.data;
  };

  static deleteSettlement = async (id) => {
    let res = await axios.delete(`${BASE_URL}/settlements/delete/${id}`);
    return res.data;
  };

  static upsertSettlement = async (id, settlement) => {
    let res = await axios.post(`${BASE_URL}/settlements/upsert`, {
      campaignId: id,
      settlement,
    });
    return res.data;
  };
}
