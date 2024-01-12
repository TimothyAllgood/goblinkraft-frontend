import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Campaign from "../../../services/campaign.service";
import { Box, Button, IconButton, Typography } from "@mui/material";
import "./CampaignNPC.css";
import { DeleteRounded } from "@mui/icons-material";

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
  };

  const handleClick = (npcId) => {
    navigate(`/campaign/${id}/npcs/${npcId}`);
  };

  const handleDelete = async (id) => {
    try {
      await Campaign.deleteNPC(id);
      setNpcs(npcs.filter((npc) => npc.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="campaign-container">
      <Button
        variant="contained"
        sx={{ width: "fit-content" }}
        onClick={() => handleClick("new")}
      >
        Add New NPC
      </Button>
      <div className="campaign-npc-list">
        {npcs.map((npc) => {
          return (
            <Box key={npc.id} className="campaign-npc" sx={{ display: "grid" }}>
              <Box
                height={1}
                width={1}
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  aspectRatio: 1,
                  backgroundColor: "primary.main",
                  backgroundImage: `url(
                    ${
                      npc.image
                        ? npc.image.url.replace(
                            "/upload",
                            "/upload/f_webp,fl_awebp,q_auto"
                          )
                        : "https://wow.zamimg.com/uploads/screenshots/normal/838204-dread-capn-placeholder.jpg"
                    }
                  )`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    color: "#fff",
                    width: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: "1rem",
                    backgroundColor: "text.secondary",
                  }}
                >
                  <Typography>{npc.name}</Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
                  >
                    <Button
                      variant="contained"
                      href={`/campaign/${id}/npcs/${npc.id}`}
                      sx={{ color: "var(--bg) !important" }}
                    >
                      Edit NPC
                    </Button>
                    <IconButton
                      sx={{ color: "white" }}
                      onClick={() => handleDelete(npc.id)}
                    >
                      <DeleteRounded />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </div>
    </div>
  );
}

export default CampaignNPC;
