import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Campaign from "../../../services/campaign.service";
import { Box, Button, IconButton, Typography } from "@mui/material";
import "./CampaignSettlement.css";
import { DeleteRounded } from "@mui/icons-material";

function CampaignSettlement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [settlements, setSettlements] = useState([]);

  useEffect(() => {
    fetchSettlements();
    return () => {
      setSettlements([]);
    };
  }, []);

  const fetchSettlements = async () => {
    let res = await Campaign.getSettlements(id);
    setSettlements(res);
  };

  const handleClick = (settlementId) => {
    navigate(`/campaign/${id}/settlements/${settlementId}`);
  };

  const handleDelete = async (id) => {
    try {
      await Campaign.deleteSettlement(id);
      setSettlements(settlements.filter((settlement) => settlement.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getPopulationImg = (population) => {
    switch (true) {
      case population > 50000:
        return "../../src/assets/metropolis.png";
      case population > 15000:
        return "../../src/assets/city.png";
      case population > 1000:
        return "../../src/assets/town.png";
      case population > 50:
        return "../../src/assets/village.png";
      default:
        return "../../src/assets/hamlet.png";
    }
  };

  return (
    <div className="campaign-container">
      <Button
        variant="contained"
        sx={{ width: "fit-content" }}
        onClick={() => handleClick("new")}
      >
        Add New Settlement
      </Button>
      <div className="campaign-settlement-list">
        {settlements.map((settlement) => {
          return (
            <Box
              key={settlement.id}
              className="campaign-settlement"
              sx={{ display: "grid" }}
            >
              <Box
                height={1}
                width={1}
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  aspectRatio: 1,
                  backgroundColor: "primary.main",
                  backgroundImage: `url(
                    ${getPopulationImg(settlement?.population)}
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
                  <Typography>{settlement.name}</Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
                  >
                    <Button
                      variant="contained"
                      href={`/campaign/${id}/settlements/${settlement.id}`}
                      sx={{ color: "var(--bg) !important" }}
                    >
                      Edit Settlement
                    </Button>
                    <IconButton
                      sx={{ color: "white" }}
                      onClick={() => handleDelete(settlement.id)}
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

export default CampaignSettlement;
