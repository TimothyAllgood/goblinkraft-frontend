import React, { useEffect, useState } from "react";
import Campaign from "../../../services/campaign.service";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "./CampaignNPCEdit.css";

function CampaignNPCEdit() {
  const { id, npcId } = useParams();
  const navigate = useNavigate();

  const [npc, setNpc] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNpc();
  }, []);

  const fetchNpc = async () => {
    try {
      setLoading(true);
      if (npcId !== "new") {
        const _npc = await Campaign.getNPC(npcId);
        console.log(_npc);
        setNpc(_npc);
      }

      if (npcId === "new") {
        setNpc({ campaignId: id });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data", error);
    }
  };
  const handleChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    setNpc((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (npcId !== "new") {
        let res = await Campaign.upsertNPC(npcId, npc);
        console.log(res);
        setNpc(res);
      }
      if (npcId === "new") {
        console.log(npc);
        let res = await Campaign.upsertNPC(null, npc);
        setNpc(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navBack = () => {
    navigate(-1);
  };

  if (loading) return <>Loading</>;

  return (
    <div className="npc-form-page campaign-container">
      <Button variant="contained" onClick={navBack}>
        Back
      </Button>
      <form onSubmit={handleSubmit}>
        <div className="name-inputs">
          <div className="form-group">
            <TextField
              id="name"
              name="name"
              label="NPC Name"
              defaultValue={npc?.name}
              variant="outlined"
              sx={{ width: 1 }}
              onChange={handleChange}
            />
          </div>
        </div>

        <Button
          variant="contained"
          sx={{ width: 0.5, alignSelf: "flex-end" }}
          type="submit"
        >
          {npcId === "new" ? "Create" : "Update"} NPC
        </Button>
      </form>
    </div>
  );
}

export default CampaignNPCEdit;
