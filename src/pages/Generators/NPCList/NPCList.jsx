import React, { useEffect, useState } from "react";
import "./NPCList.css";
import NPC from "./NPC/NPC";
import Npc from "../../../services/generator/npc.service";
import {
  Box,
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import UpgradeRoundedIcon from "@mui/icons-material/UpgradeRounded";

function NPCList() {
  const [npcs, setNpcs] = useState([]);
  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [selectedArt, setSelectedArt] = useState();

  const subscribed = useSelector((state) => state.user.subscribed);

  useEffect(() => {
    fetchNpcs();
  }, []);

  const fetchNpcs = async () => {
    try {
      setGenerating(true);
      let res = await Npc.generateNpcs();
      setNpcs(res.npcs);
      setGenerating(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAINpcs = async () => {
    try {
      setGenerating(true);
      let res = await Npc.generateAINpcs();
      setNpcs(res.npcs);
      setGenerating(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.4)",
          display: generating ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: generating ? 10000 : -1000,
        }}
      >
        {generating && <CircularProgress />}
      </Box>
      <div className="button-container">
        <Button
          variant="contained"
          disabled={!subscribed || generating}
          onClick={fetchAINpcs}
        >
          Generate AI NPCs
        </Button>
        {!subscribed && (
          <Tooltip
            className="info-tooltip"
            title={
              <>
                <Typography>Requires Subscription</Typography>
              </>
            }
            arrow
            enterTouchDelay={100}
          >
            <UpgradeRoundedIcon
              color="primary"
              sx={{
                background: "var(--main)",
                color: "var(--nav-bg)",
                borderRadius: "50%",
              }}
            />
          </Tooltip>
        )}
        <Button variant="contained" disabled={generating} onClick={fetchNpcs}>
          Roll New NPCs
        </Button>
      </div>
      <section className="npc-list">
        {npcs.map((npc, i) => {
          return (
            <NPC
              key={i}
              npc={npc}
              generating={generating}
              setGenerating={setGenerating}
              setOpen={setOpen}
              setSelectedArt={setSelectedArt}
            />
          );
        })}
      </section>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.4)",
          display: generating || open ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: generating || open ? 10000 : -1000,
        }}
      >
        <CloseIcon
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            cursor: "pointer",
            fontSize: "2rem",
          }}
        />
        {selectedArt && (
          <img
            src={selectedArt}
            style={{ aspectRatio: "1/1", width: "auto", height: "80vh" }}
          />
        )}
      </Box>
    </>
  );
}

export default NPCList;
