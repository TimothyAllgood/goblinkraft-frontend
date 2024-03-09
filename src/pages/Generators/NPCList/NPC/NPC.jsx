import { Button, Divider, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./NPC.css";
import Stat from "../../../../util/stat.util";
// import Tooltip from "../../../../components/Tooltip/Tooltip";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { useSelector } from "react-redux";
import Npc from "../../../../services/generator/npc.service";

function NPC({
  npc,
  disableActivity,
  generating,
  setGenerating,
  setOpen,
  setSelectedArt,
}) {
  const [art, setArt] = useState();
  const subscribed = useSelector((state) => state.user.subscribed);
  const subscription = useSelector((state) => state.user.subscription);

  useEffect(() => {
    if (setOpen) {
      setArt();
      setOpen(false);
      setGenerating(false);
      setSelectedArt();
    }
  }, [npc]);

  const generateArt = async () => {
    try {
      setGenerating(true);
      setOpen(false);
      setSelectedArt();
      let res = await Npc.generateArt(npc);
      setArt(res.art);
      setSelectedArt(res.art);
      setGenerating(false);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="npc-card">
      <div className="npc-header">
        <div className="name">
          <h3>{npc.name}</h3>
        </div>
        <div className="details">
          {npc.gender} {npc.race} {npc.job}
        </div>
      </div>
      <Divider />
      <div className="stats">
        {npc.stats.map((stat, i) => {
          return (
            <div className="stat" key={i}>
              <p className="stat-name">{Stat.getStatAbbreviation(stat.name)}</p>
              <div className="value-modifier">
                <p className="value">{stat.val}</p>
                <p className="modifier">
                  {Stat.getModifier(stat.val) >= 0 && <>+</>}
                  {Stat.getModifier(stat.val)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Divider />
      <div className="npc-info">
        <div className="description detail">{npc.description}</div>
        {!disableActivity && (
          <div className="trait activity">
            <p className="bold">Current Activity: </p>
            <p> {npc.activity.name} </p>
            <Tooltip
              className="info-tooltip"
              title={
                <>
                  <Typography>{npc.activity.info}</Typography>
                </>
              }
              arrow
              enterTouchDelay={100}
            >
              <InfoRoundedIcon color="primary" />
            </Tooltip>
          </div>
        )}

        <div className="trait quirk">
          <p className="bold">Quirk: </p>
          <p> {npc.quirk.name} </p>
          {/* <Tooltip content={npc.quirk.info} /> */}
          <Tooltip
            className="info-tooltip"
            title={
              <>
                <Typography>{npc.quirk.info}</Typography>
              </>
            }
            arrow
            enterTouchDelay={100}
          >
            <InfoRoundedIcon color="primary" />
          </Tooltip>
        </div>
        <div className="trait quirk">
          <p className="bold">Plot Hook: </p>
          <p> {npc.hook.description} </p>
        </div>
        {/* <div className="ideal trait">
          <p className="bold">Ideal: </p>
          <p> {npc.ideal}</p>
        </div>
        <div className="flaw trait">
          <p className="bold">Flaw: </p>
          <p> {npc.flaw}</p>
        </div>
        <div className="bond trait">
          <p className="bold">Hook: </p>
          <p> {npc.bond}</p>
        </div> */}
      </div>
      {setOpen && (
        <Button
          sx={{ ml: "1rem", mb: "1rem" }}
          variant="contained"
          disabled={!subscribed || subscription !== "premium" || generating}
          onClick={generateArt}
        >
          Generate NPC Art
        </Button>
      )}

      {art && (
        <Button
          variant="contained"
          sx={{ ml: "1rem", mb: "1rem" }}
          onClick={() => {
            setOpen(false);
            setOpen(true);
            setSelectedArt(art);
          }}
        >
          View Art
        </Button>
      )}
    </div>
  );
}

export default NPC;
