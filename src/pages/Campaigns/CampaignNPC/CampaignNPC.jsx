import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Campaign from "../../../services/campaign.service";
import { Box, Button, Typography } from "@mui/material";
import "./CampaignNPC.css";

function CampaignNPC() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [npcs, setNpcs] = useState([]);

  useEffect(() => {
    fetchNPCS();
  }, []);

  const fetchNPCS = async () => {
    let res = await Campaign.getNPCs(id);
    setNpcs(res);
    console.log(res);
  };

  const handleClick = (npcId) => {
    navigate(`/campaign/${id}/npcs/${npcId}`);
  };

  return (
    <div className="campaign-container">
      <Button variant="contained" onClick={() => handleClick("new")}>
        Add New NPC
      </Button>
      <div className="campaign-npc-list">
        {npcs.map((npc) => {
          return (
            <Box
              className="campaign-npc"
              sx={{ display: "grid" }}
              onClick={() => handleClick(npc.id)}
            >
              <Typography>{npc.name}</Typography>
            </Box>
          );
        })}
      </div>
    </div>
  );
}

export default CampaignNPC;
